const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

// Mongo connection
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, username, password } = req.body;

    // Data validation check
    if (!name || !username || !password) {
      return res.status(400).json({ message: 'All fields (name, username, password) are required.' });
    }

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'GET') {
    // Fetch all users or a single user by ID
    const { id } = req.query; // Get user ID from query params (optional)
    
    if (id) {
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user); // Return the user by ID
      } catch (error) {
        res.status(500).json({ message: 'Error fetching user.' });
      }
    } else {
      try {
        const users = await User.find();  // Fetch all users
        res.status(200).json(users); // Return all users
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
