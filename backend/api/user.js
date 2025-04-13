import connectDB from './lib/connectDB';
import User from '../models/User';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const users = await User.find();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json(newUser);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
