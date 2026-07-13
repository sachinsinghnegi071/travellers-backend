import mongoose from "mongoose";

const travellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const tripRequestSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    members: {
      type: Number,
      required: true,
      enum: [2, 4, 6, 8, 10],
    },
    travellers: {
      type: [travellerSchema],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one traveller is required",
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    days: {
      type: Number,
      required: true,
      min: 1,
    },
    budget: {
      type: Number,
      min: 0,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const TripRequest = mongoose.model("TripRequest", tripRequestSchema);

export default TripRequest;
