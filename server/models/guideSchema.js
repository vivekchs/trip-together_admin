const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  phone: {
    type: String,
  },
  experience: {
    type: String,
    default: '',
  },
  rating: {
    type: String,
    default: '',
  },
  specialization: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  assignedTrips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Guide = mongoose.model('Guide', guideSchema);
module.exports = Guide;
