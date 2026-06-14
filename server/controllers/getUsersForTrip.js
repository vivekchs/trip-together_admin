const Trip = require('../models/tripsSchema.js');

async function getUsersForTrip(req, res) {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId).populate('users', 'name email').exec();

    if (!trip) {
      throw new Error('Trip not found');
    }

    return res.code(200).send(trip.users);
  } catch (error) {
    console.error('Error fetching users for trip:', error);
    return res.code(200).send(error);
  }
}

module.exports = getUsersForTrip;
