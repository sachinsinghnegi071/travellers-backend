import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    photos: [{ type: String }], // Cloudinary URLs
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
