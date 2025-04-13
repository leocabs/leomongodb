// backend/api/users/register.js
const bcrypt = require('bcrypt');
const User = require('../../models/User');  // Path to your User model
import dbConnect from '../../utils/dbConnect';  // If you use a database connection utility (optional)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, username, password } = req.body;

    try {
      // Connect to the database (optional if you are using a utility)
      await dbConnect();

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        name,
        username,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
