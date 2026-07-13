import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tag: { type: String, required: true },
    text: { type: String, required: true },
    overview: { type: String },
    images: [{ type: String }], // Cloudinary URLs
    heroImage: { type: String },
    bestTimeToVisit: { type: String },
    trekDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Difficult', 'Expert'] },
    budgetEstimate: { type: Number },
    defaultDays: { type: Number, default: 3 },
    hotelPricePerDay: { type: Number, default: 0 },
    foodPricePerDay: { type: Number, default: 0 },
    ridePricePerDay: { type: Number, default: 0 },
    trekkingPricePerDay: { type: Number, default: 0 },
    guidePricePerDay: { type: Number, default: 0 },
    otherPricePerDay: { type: Number, default: 0 },
    doubleBedAvailable: { type: Boolean, default: true },
    singleBedAvailable: { type: Boolean, default: true },
    separateRoomAvailable: { type: Boolean, default: true },
    doubleBedPricePerDay: { type: Number, default: 0 },
    singleBedPricePerDay: { type: Number, default: 0 },
    separateRoomPricePerDay: { type: Number, default: 0 },
    weatherInfo: { type: String },
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      }
    ],
    route: [
      {
        day: { type: Number },
        name: { type: String },
        desc: { type: String },
        time: { type: String },
        image: { type: String },
        hotelName: { type: String },
        hotelImage: { type: String },
        hotelLink: { type: String },
        food: { type: String },
      }
    ],
    nearbyPlaces: [{ type: String }],
  },
  { timestamps: true }
);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
