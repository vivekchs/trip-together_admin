const User = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignup = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.code(400).send({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // You’ll need to add password to the schema
    });

    await newUser.save();

    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: 'user',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return reply.code(201).send({
      message: 'Signup successful',
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: 'user',
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return reply.code(500).send({ message: 'Server error' });
  }
};

const userLogin = async (req, reply) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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
      role: 'user',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return reply.code(200).send({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: 'user',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return reply.code(500).send({ message: 'Server error' });
  }
};

module.exports = { userSignup, userLogin };
