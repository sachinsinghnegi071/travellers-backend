import Destination from '../models/Destination.js';

export const getDestinations = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    
    // Build query object based on search/filters
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Destination.countDocuments({ ...keyword });
    const destinations = await Destination.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      destinations,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationBySlug = async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });
    if (destination) {
      res.json({ success: true, destination });
    } else {
      res.status(404).json({ success: false, message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Find the destination by old slug in params and update it with new data
    // runValidators ensures enum constraints are checked
    const destination = await Destination.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (destination) {
      res.json({ success: true, destination });
    } else {
      res.status(404).json({ success: false, message: 'Destination not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
