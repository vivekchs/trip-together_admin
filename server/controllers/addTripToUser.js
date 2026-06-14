const User = require('../models/userSchema');
const Trip = require('../models/tripsSchema');

const addUserToTrip = async (req, res) => {
  const { userId, email, tripId } = req.body;

  if (!tripId || (!userId && !email)) {
    return res.code(400).send({ error: 'Trip ID and either User ID or Email are required' });
  }

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.code(404).send({ error: 'User not found' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.code(404).send({ error: 'Trip not found' });
    }

    if (!user.trips.includes(tripId)) {
      user.trips.push(tripId);
      await user.save();
    }

    if (!trip.users.includes(user._id)) {
      trip.users.push(user._id);
      await trip.save();
    }

    res.code(200).send({ message: 'User added to trip successfully', user, trip });
  } catch (error) {
    console.error('Error adding user to trip:', error);
    res.code(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = addUserToTrip;
