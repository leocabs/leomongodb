const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');  // or 'bcryptjs' if you installed bcryptjs

// Register user
router.post('/users/register', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/users', async (req, res) => {
    try {
      const users = await User.find();  // Fetch all users from the database
      res.status(200).json(users); // Return the users
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

module.exports = router;
