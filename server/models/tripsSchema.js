const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    duration: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    price: {
      type: String,
    },
    highlights: {
      type: [String],
      default: [],
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    numberOfPeople: {
      type: Number,
      min: 1,
    },
    itenary: {
      type: [
        {
          day: Number,
          activities: [String],
        },
      ],
      default: [],
    },
    category: {
      type: String,
      // enum: ["adventure", "cultural", "leisure", "wildlife", "religious"],
    },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'completed'],
      default: 'pending',
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guide',
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !this.startDate || value > this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
