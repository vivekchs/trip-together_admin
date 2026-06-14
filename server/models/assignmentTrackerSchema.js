const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  key: { type: String, unique: true }, // e.g., 'guideRoundRobin'
  lastAssignedIndex: { type: Number, default: -1 },
});

const AssignmentTracker = mongoose.model('AssignmentTracker', trackerSchema);

module.exports = AssignmentTracker;
