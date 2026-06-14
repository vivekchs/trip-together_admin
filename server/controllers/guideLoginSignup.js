const Guide = require('../models/guideSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const guideSignup = async (req, reply) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const existingGuide = await Guide.findOne({ email });
    if (existingGuide) {
      return reply.code(400).send({ message: 'Guide already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGuide = new Guide({
      name,
      email,
      password: hashedPassword,
      phone: phoneNumber,
      isApproved: false, // default to not approved
    });

    await newGuide.save();

    const payload = {
      id: newGuide._id,
      email: newGuide.email,
      role: 'guide',
      isApproved: newGuide.isApproved,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return reply.code(201).send({
      message: 'Signup successful',
      token,
      user: {
        name: newGuide.name,
        email: newGuide.email,
        role: 'guide',
        isApproved: newGuide.isApproved,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return reply.code(500).send({ message: error.message || 'Server error' });
  }
};

const guideLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;
    console.log('login request received:', await Guide.findOne());
    const user = await Guide.findOne({ email });
    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: 'guide',
      isApproved: user.isApproved,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return reply.code(200).send({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'guide',
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return reply.code(500).send({ message: 'Server error' });
  }
};

// New controller for users to register as guides (goes to admin for approval)
const registerAsGuide = async (req, reply) => {
  try {
    const { email, name, experience, rating, specialization, image, bio, phoneNumber } = req.body;

    // Check if guide already exists
    const existingGuide = await Guide.findOne({ email });
    if (existingGuide) {
      return reply.code(400).send({ message: 'You are already registered as a guide. Please wait for admin approval.' });
    }

    // Create new guide profile with isApproved: false (pending admin approval)
    const newGuide = new Guide({
      name,
      email,
      phone: phoneNumber,
      experience,
      rating,
      specialization,
      image,
      bio,
      isApproved: false,
    });

    await newGuide.save();

    return reply.code(201).send({
      message: 'Guide profile submitted successfully. Please wait for admin approval.',
      guide: {
        id: newGuide._id,
        name: newGuide.name,
        email: newGuide.email,
        experience: newGuide.experience,
        specialization: newGuide.specialization,
        isApproved: false,
      },
    });
  } catch (error) {
    console.error('Register as guide error:', error);
    return reply.code(500).send({ message: error.message || 'Server error' });
  }
};

// Update guide profile and mark as pending approval
const updateGuideProfile = async (req, reply) => {
  try {
    // Expect Authorization: Bearer <token>
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!token) return reply.code(401).send({ message: 'Authorization token required' });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return reply.code(401).send({ message: 'Invalid or expired token' });
    }

    if (payload.role !== 'guide') {
      return reply.code(403).send({ message: 'Only guides can update their profile' });
    }

    const guideId = payload.id;
    const {
      name,
      phoneNumber,
      experience,
      rating,
      specialization,
      image,
      bio,
      password,
    } = req.body;

    const updateData = {
      ...(name ? { name } : {}),
      ...(phoneNumber ? { phone: phoneNumber } : {}),
      ...(experience ? { experience } : {}),
      ...(rating ? { rating } : {}),
      ...(specialization ? { specialization } : {}),
      ...(image ? { image } : {}),
      ...(bio ? { bio } : {}),
      isApproved: false, // mark pending for re-review
    };

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updated = await Guide.findByIdAndUpdate(guideId, updateData, { new: true });
    if (!updated) return reply.code(404).send({ message: 'Guide not found' });

    return reply.code(200).send({ message: 'Profile updated and sent for admin review', guide: updated });
  } catch (error) {
    console.error('Update guide profile error:', error);
    return reply.code(500).send({ message: error.message || 'Server error' });
  }
};

module.exports = { guideLogin, guideSignup, registerAsGuide, updateGuideProfile };
