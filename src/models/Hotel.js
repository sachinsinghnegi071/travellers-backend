import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Please provide a hotel name'] 
    },
    manager: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true
    },
    location: { 
      type: String, 
      required: [true, 'Please provide a location/city (e.g. Rishikesh)'] 
    },
    images: [{ 
      type: String 
    }],
    singleBedRooms: { 
      type: Number, 
      default: 0 
    },
    doubleBedRooms: { 
      type: Number, 
      default: 0 
    },
    singleBedPrice: { 
      type: Number, 
      default: 0 
    },
    doubleBedPrice: { 
      type: Number, 
      default: 0 
    },
    food: { 
      type: String,
      default: 'Meals not included'
    },
    details: { 
      type: String 
    },
    rating: { 
      type: Number, 
      default: 5 
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
