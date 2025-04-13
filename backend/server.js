const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configure CORS to allow only your frontend's domain
const corsOptions = {
  origin: 'https://leomongodb-o4lbffga6-leocabs29s-projects-3747cf8b.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const UserRoutes = require('./routes/user');
app.use('/api', UserRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
