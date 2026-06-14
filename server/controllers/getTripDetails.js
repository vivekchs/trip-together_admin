const Trip = require('../models/tripsSchema.js');

const getTripDetails = async (req, res) => {
  try {
    const { tripId } = req.body;

    console.log('📩 Received tripId in request body:', tripId);

    // Handle invalid or missing tripId
    if (!tripId || typeof tripId !== 'string' || tripId.trim() === '') {
      console.log('ℹ️ No valid tripId provided. Returning all trips...');
      const allTrips = await Trip.find();
      return res.code(200).send({
        success: true,
        data: allTrips,
      });
    }

    // Find specific trip by ID
    const trip = await Trip.findById(tripId.trim()).populate('guide').populate('users').exec();
    console.log(trip);
    if (!trip) {
      console.log('⚠️ Trip not found with ID:', tripId);
      return res.code(404).send({
        success: false,
        message: 'Trip not found',
      });
    }

    console.log('✅ Trip found:', trip._id);
    return res.code(200).send({
      success: true,
      data: trip,
    });
  } catch (err) {
    console.error('❌ Error fetching trip details:', err);
    return res.code(500).send({
      success: false,
      error: 'Server error while fetching trip details',
    });
  }
};

module.exports = getTripDetails;
