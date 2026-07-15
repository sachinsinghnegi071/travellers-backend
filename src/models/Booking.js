import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    members: { type: Number, required: true },
    rooms: { type: Number, default: 1 },
    roomDetails: [
      {
        bedPreference: { type: String, enum: ['Double Bed', 'Single Bed'], default: 'Double Bed' }
      }
    ],
    travellers: [
      {
        name: { type: String },
        age: { type: Number },
        gender: { type: String, enum: ['Male', 'Female'], default: 'Male' },
      }
    ],
    selectedHotels: [
      {
        day: { type: Number },
        location: { type: String },
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
        hotelName: { type: String },
        price: { type: Number }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    paymentId: { type: String },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
