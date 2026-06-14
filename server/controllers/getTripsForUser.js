const Trip = require('../models/tripsSchema');
const User = require('../models/userSchema');

async function getTripsForUser(req, res) {
  try {
    const { userId, email } = req.body;

    if (email) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('_id');
      if (!user) {
        return res.status(404).send({ error: 'User not found with this email' });
      }

      const trips = await Trip.find({ users: user._id })
        .populate('guide', 'name email')
        .populate('users', 'name email')
        .exec();

      return res.status(200).send(trips);
    }

    if (!userId) {
      return res.status(400).send({ error: 'Either email or userId is required' });
    }

    const trips = await Trip.find({ users: userId })
      .populate('guide', 'name email')
      .populate('users', 'name email')
      .exec();

    return res.status(200).send(trips);
  } catch (err) {
    console.error('Error fetching trips for user:', err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

module.exports = getTripsForUser;
