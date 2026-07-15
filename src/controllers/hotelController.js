import Hotel from '../models/Hotel.js';

// Create or Update Hotel Profile
export const createOrUpdateHotel = async (req, res) => {
  try {
    const { 
      name, 
      location, 
      images, 
      singleBedRooms, 
      doubleBedRooms, 
      singleBedPrice, 
      doubleBedPrice, 
      food, 
      details 
    } = req.body;

    const managerId = req.user._id;

    let hotel = await Hotel.findOne({ manager: managerId });

    if (hotel) {
      // Update existing hotel profile
      hotel.name = name || hotel.name;
      hotel.location = location || hotel.location;
      hotel.images = images || hotel.images;
      hotel.singleBedRooms = singleBedRooms !== undefined ? Number(singleBedRooms) : hotel.singleBedRooms;
      hotel.doubleBedRooms = doubleBedRooms !== undefined ? Number(doubleBedRooms) : hotel.doubleBedRooms;
      hotel.singleBedPrice = singleBedPrice !== undefined ? Number(singleBedPrice) : hotel.singleBedPrice;
      hotel.doubleBedPrice = doubleBedPrice !== undefined ? Number(doubleBedPrice) : hotel.doubleBedPrice;
      hotel.food = food !== undefined ? food : hotel.food;
      hotel.details = details !== undefined ? details : hotel.details;

      await hotel.save();

      return res.status(200).json({
        success: true,
        message: 'Hotel profile updated successfully',
        hotel
      });
    }

    // Create new hotel profile
    hotel = await Hotel.create({
      name,
      manager: managerId,
      location,
      images: images || [],
      singleBedRooms: Number(singleBedRooms || 0),
      doubleBedRooms: Number(doubleBedRooms || 0),
      singleBedPrice: Number(singleBedPrice || 0),
      doubleBedPrice: Number(doubleBedPrice || 0),
      food: food || 'Meals not included',
      details: details || '',
    });

    res.status(201).json({
      success: true,
      message: 'Hotel profile created successfully',
      hotel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch hotel profile managed by the logged-in user
export const getManagerHotel = async (req, res) => {
  try {
    const managerId = req.user._id;
    const hotel = await Hotel.findOne({ manager: managerId });

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel profile not found for this manager' });
    }

    res.status(200).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch hotels, with optional location filter
export const getHotelsByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};

    if (location) {
      // Find case-insensitive location matches
      query.location = { $regex: new RegExp(location.trim(), 'i') };
    }

    const hotels = await Hotel.find(query).populate('manager', 'name email');

    res.status(200).json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
