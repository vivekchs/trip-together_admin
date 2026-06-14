const Trip = require('../models/tripsSchema.js'); // Adjust path as needed

const getTripsForGuide = async (req, res) => {
  try {
    const guideId = req.body.guideId;

    const trips = await Trip.find({ guide: guideId }).populate('users').populate('guide').exec();

    return res.code(200).send({
      success: true,
      data: trips,
    });
  } catch (err) {
    console.error('Error fetching trips for guide:', err);
    return res.code(200).send({
      success: false,
      error: 'Server error while fetching trips',
    });
  }
};

module.exports = getTripsForGuide;
