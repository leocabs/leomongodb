import connectDB from './lib/connectDB';  // <-- adjust if your path is different
import User from './models/User';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await connectDB();

  if (req.method === 'GET') {
    const users = await User.find();
    return res.status(200).json(users);
  } 
  else if (req.method === 'POST') {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const newUser = new User({ name, email });
    await newUser.save();
    return res.status(201).json(newUser);
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
