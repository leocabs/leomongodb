const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Register user (POST request)
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, username, password } = req.body;
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        username,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

// Fetch users (GET request)
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
