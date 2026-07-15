import crypto from 'crypto';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import Booking from '../models/Booking.js';
import Destination from '../models/Destination.js';
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';

// Since the user may not have a real Razorpay account configured, 
// we'll use fallback test keys if none are provided in env.
let razorpayInstance = null;
const getRazorpay = () => {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy123',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });
  }
  return razorpayInstance;
};

// Setup dummy email transporter using Ethereal
const getEmailTransporter = async () => {
  // If no SMTP configured, use ethereal for testing
  if (!process.env.SMTP_HOST) {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const createBooking = async (req, res) => {
  try {
    const { destinationId, startDate, endDate, members, travellers, totalAmount, rooms, roomDetails, selectedHotels } = req.body;
    
    // We expect the frontend to pass the user context via JWT (req.user),
    // but we can also fall back to allowing guest bookings by creating a temp user if needed.
    // For now, let's assume they might be guests if req.user is undefined.
    // Wait, the schema requires a user ref. We'll use a dummy user if not logged in.
    let userId = req.user ? req.user._id : null;
    
    if (!userId) {
      // Find or create a guest user
      const guestEmail = 'guest@example.com';
      let guestUser = await User.findOne({ email: guestEmail });
      if (!guestUser) {
        guestUser = await User.create({
          name: 'Guest User',
          email: guestEmail,
          password: 'guestpassword',
        });
      }
      userId = guestUser._id;
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    // Recalculate cost dynamically to prevent front-end tampering
    let calculatedAmount = destination.budgetEstimate * members;
    const hotelPrice = destination.hotelPricePerDay || 0;
    const foodPrice = destination.foodPricePerDay || 0;
    const ridePrice = destination.ridePricePerDay || 0;
    const trekkingPrice = destination.trekkingPricePerDay || 0;
    const guidePrice = destination.guidePricePerDay || 0;
    const otherPrice = destination.otherPricePerDay || 0;

    let bookingSelectedHotels = [];

    if (hotelPrice > 0 || foodPrice > 0 || ridePrice > 0 || trekkingPrice > 0 || guidePrice > 0 || otherPrice > 0) {
      let days = 0;
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end - start;
        if (diffTime >= 0) {
          days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        }
      }
      if (days <= 0) {
        days = destination.defaultDays || 3;
      }

      const selectedRooms = Number(rooms || 1);
      const details = Array.isArray(roomDetails) && roomDetails.length === selectedRooms 
        ? roomDetails 
        : Array.from({ length: selectedRooms }, () => ({ bedPreference: 'Double Bed' }));

      // Fetch all custom hotels if selected
      let hotelsMap = {};
      if (Array.isArray(selectedHotels) && selectedHotels.length > 0) {
        const hotelIds = selectedHotels.map(sh => sh.hotelId).filter(Boolean);
        const hotels = await Hotel.find({ _id: { $in: hotelIds } });
        hotels.forEach(h => {
          hotelsMap[h._id.toString()] = h;
        });
      }

      let hotelTotal = 0;
      for (let d = 1; d <= days; d++) {
        const customSelect = Array.isArray(selectedHotels)
          ? selectedHotels.find(sh => Number(sh.day) === d)
          : null;

        let hotelItem = null;
        if (customSelect && customSelect.hotelId) {
          hotelItem = hotelsMap[customSelect.hotelId];
        }

        let dayRoomsCost = 0;
        for (const room of details) {
          const selectedBed = room.bedPreference || 'Double Bed';
          let rate = hotelPrice;

          if (hotelItem) {
            if (selectedBed === 'Double Bed') {
              rate = hotelItem.doubleBedPrice !== undefined ? hotelItem.doubleBedPrice : hotelPrice;
            } else if (selectedBed === 'Single Bed') {
              rate = hotelItem.singleBedPrice !== undefined ? hotelItem.singleBedPrice : hotelPrice;
            }
          } else {
            if (selectedBed === 'Double Bed') {
              rate = destination.doubleBedPricePerDay || hotelPrice;
            } else if (selectedBed === 'Single Bed') {
              rate = destination.singleBedPricePerDay || hotelPrice;
            }
          }
          dayRoomsCost += rate;
        }

        hotelTotal += dayRoomsCost;

        if (hotelItem) {
          bookingSelectedHotels.push({
            day: d,
            location: hotelItem.location,
            hotel: hotelItem._id,
            hotelName: hotelItem.name,
            price: dayRoomsCost
          });
        }
      }
      
      const foodTotal = days * foodPrice * members;
      const rideTotal = days * ridePrice * members;
      const trekkingTotal = days * trekkingPrice * members;
      const guideTotal = days * guidePrice * members;
      const otherTotal = days * otherPrice * members;

      calculatedAmount = hotelTotal + foodTotal + rideTotal + trekkingTotal + guideTotal + otherTotal;
    }

    const bookingId = `BK-${Date.now()}`;

    const booking = await Booking.create({
      bookingId,
      user: userId,
      destination: destinationId,
      startDate,
      endDate,
      members,
      rooms: Number(rooms || 1),
      roomDetails: Array.isArray(roomDetails) && roomDetails.length === Number(rooms || 1)
        ? roomDetails
        : Array.from({ length: Number(rooms || 1) }, () => ({ bedPreference: 'Double Bed' })),
      travellers,
      selectedHotels: bookingSelectedHotels,
      totalAmount: calculatedAmount,
      status: 'Pending',
      paymentStatus: 'Pending'
    });

    // Create Razorpay Order
    // In test mode with dummy keys, this might fail. We'll simulate success if dummy keys are used.
    const rzp = getRazorpay();
    if (rzp.key_id === 'rzp_test_dummy123') {
      return res.status(201).json({
        success: true,
        booking,
        orderId: `order_${Date.now()}`, // Mock order ID
        isDemo: true,
        key: rzp.key_id
      });
    }

    const options = {
      amount: calculatedAmount * 100, // Amount in paise
      currency: "INR",
      receipt: bookingId,
    };

    const order = await rzp.orders.create(options);

    res.status(201).json({
      success: true,
      booking,
      orderId: order.id,
      isDemo: false,
      key: rzp.key_id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    // Simulate verification if using dummy keys
    const rzp = getRazorpay();
    let isAuthentic = true;
    if (rzp.key_secret !== 'dummy_secret') {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
      isAuthentic = expectedSignature === razorpay_signature;
    }

    if (isAuthentic) {
      const booking = await Booking.findOne({ bookingId }).populate('destination');
      if (booking) {
        booking.status = 'Confirmed';
        booking.paymentStatus = 'Paid';
        booking.paymentId = razorpay_payment_id;
        await booking.save();

        // Send confirmation email asynchronously
        const sendBookingEmailAsync = async () => {
          try {
            const user = await User.findById(booking.user);
            const transporter = await getEmailTransporter();
            const info = await transporter.sendMail({
              from: '"Tour & Travellers" <noreply@tourandtravellers.com>',
              to: user.email,
              subject: "Booking Confirmed - Tour & Travellers",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                  <h2 style="color: #062175; text-align: center;">Tour & Travellers</h2>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                  <h3 style="color: #333;">Your Booking is Confirmed!</h3>
                  <p style="color: #555; line-height: 1.6;">Hello,</p>
                  <p style="color: #555; line-height: 1.6;">Thank you for booking with Tour & Travellers. Your payment has been successfully processed and your trip is confirmed.</p>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${booking.bookingId}</p>
                    <p style="margin: 5px 0;"><strong>Destination:</strong> ${booking.destination ? booking.destination.title : 'Package'}</p>
                    <p style="margin: 5px 0;"><strong>Members:</strong> ${booking.members}</p>
                    <p style="margin: 5px 0;"><strong>Total Paid:</strong> ₹${booking.totalAmount}</p>
                  </div>
                  <p style="color: #555; line-height: 1.6;">We look forward to hosting you!</p>
                  <p style="color: #555; line-height: 1.6;">Best regards,<br><strong>Tour & Travellers Team</strong></p>
                </div>
              `,
            });
            console.log("Email sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
          } catch (emailError) {
            console.error("Failed to send email:", emailError);
          }
        };

        // Fire and forget
        sendBookingEmailAsync();

        res.json({ success: true, booking });
      } else {
        res.status(404).json({ success: false, message: 'Booking not found' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('destination')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
