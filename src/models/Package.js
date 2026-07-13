import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    durationDays: { type: Number, required: true },
    durationNights: { type: Number, required: true },
    price: { type: Number, required: true },
    hotelIncluded: { type: Boolean, default: true },
    mealsIncluded: { type: Boolean, default: true },
    trekGuideIncluded: { type: Boolean, default: false },
    transportIncluded: { type: Boolean, default: true },
    highlights: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Package = mongoose.model('Package', packageSchema);
export default Package;
