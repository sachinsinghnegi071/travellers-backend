import Review from '../models/Review.js';

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { destination, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide both rating and comment' });
    }

    // Check if review already exists for this user and destination
    let review = await Review.findOne({ user: req.user._id, destination });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      review = new Review({
        user: req.user._id,
        destination,
        rating,
        comment,
      });
      await review.save();
    }

    // Populate user and destination info for immediate UI updates if needed
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name email')
      .populate('destination', 'title slug');

    res.status(200).json({
      success: true,
      message: 'Review submitted successfully',
      review: populatedReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', '_id name')
      .populate('destination', 'title slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
