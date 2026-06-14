const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const Guide = require('../models/guideSchema');
const Trip = require('../models/tripsSchema');
const User = require('../models/userSchema');

const adminLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: 'admin',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return reply.code(200).send({
      message: 'Admin login successful',
      token,
      user: {
        name: admin.name,
        email: admin.email,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return reply.code(500).send({ message: 'Server error' });
  }
};

const getPendingGuides = async (req, reply) => {
  try {
    const pendingGuides = await Guide.find({ isApproved: false }).select('-password');
    reply.code(200).send({ status: 'success', total: pendingGuides.length, data: pendingGuides });
  } catch (error) {
    console.error('Error fetching pending guides:', error);
    reply.code(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

const approveGuide = async (req, reply) => {
  try {
    const { guideId, approve } = req.body;
    if (!guideId) {
      return reply.code(400).send({ message: 'guideId is required' });
    }

    const guide = await Guide.findById(guideId);
    if (!guide) {
      return reply.code(404).send({ message: 'Guide not found' });
    }

    guide.isApproved = approve !== false;
    await guide.save();

    reply.code(200).send({ status: 'success', data: guide });
  } catch (error) {
    console.error('Error approving guide:', error);
    reply.code(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

const getAllGuidesForAdmin = async (req, reply) => {
  try {
    const guides = await Guide.find().select('-password');
    reply.code(200).send({ status: 'success', total: guides.length, data: guides });
  } catch (error) {
    console.error('Error fetching all guides for admin:', error);
    reply.code(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

const getAllTripsForAdmin = async (req, reply) => {
  try {
    const trips = await Trip.find()
      .populate('guide', 'name email phone isApproved')
      .populate('users', 'name email');
    reply.code(200).send({ status: 'success', total: trips.length, data: trips });
  } catch (error) {
    console.error('Error fetching trips for admin:', error);
    reply.code(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

const deleteGuide = async (req, reply) => {
  try {
      const { guideId } = req.params;
      console.log('Guide ID to delete:', guideId);
    if (!guideId) {
      return reply.code(400).send({ message: 'guideId is required' });
    }
    console.log('Deleted Guide:', guide);
    const guide = await Guide.findByIdAndDelete(guideId);
    console.log('Deleted Guide:', guide);
    if (!guide) {
      return reply.code(404).send({ message: 'Guide not found' });
    }

    reply.code(200).send({ status: 'success', message: 'Guide deleted', data: guide });
  } catch (error) {
    console.error('Error deleting guide:', error);
    reply.code(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

const deleteTrip = async (req, reply) => {
  try {
    const { tripId } = req.params;
    if (!tripId) {
      return reply.code(400).send({ message: 'tripId is required' });
    }

    const trip = await Trip.findByIdAndDelete(tripId);
    if (!trip) {
      return reply.code(404).send({ message: 'Trip not found' });
    }

    // Remove trip from users' trips list
    if (trip.users && trip.users.length > 0) {
      await User.updateMany(
        { _id: { $in: trip.users } },
        { $pull: { trips: tripId } }
      );
    }

    // Remove trip from guide's assigned trips
    if (trip.guide) {
      await Guide.updateOne(
        { _id: trip.guide },
        { $pull: { assignedTrips: tripId }, $inc: { tripCount: -1 } }
      );
    }

    reply.code(200).send({ status: 'success', message: 'Trip deleted', data: trip });
  } catch (error) {
    console.error('Error deleting trip:', error);
    reply.code(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

module.exports = {
  adminLogin,
  getPendingGuides,
  approveGuide,
  getAllGuidesForAdmin,
  getAllTripsForAdmin,
  deleteGuide,
  deleteTrip,
};
