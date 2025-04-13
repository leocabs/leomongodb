import connectDB from './lib/connectDB';
import User from '../models/User';

export default async function handler(req, res) {
  await connectDB();

  const users = await User.find();
  res.status(200).json(users);
}
