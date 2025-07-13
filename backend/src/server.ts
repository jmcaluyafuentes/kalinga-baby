import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import foodRoutes from './routes/foodRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Kalinga Baby app.')
});

app.get('/ping', (req, res) => {
  res.send('pong')
});

app.use('/api/foods', foodRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(async () => {
    console.log('✅ MongoDB connected');

    // Keep-alive ping every 9 minutes to prevent spin-down (for free-tier dev use)
    await mongoose.connection.asPromise();

    if (mongoose.connection.db) {
      setInterval(async () => {
        try {
          await mongoose.connection.db!.command({ ping: 1 });
          console.log('✅ Pinged MongoDB to keep connection alive');
        } catch (err) {
          console.error('❌ MongoDB ping failed:', err);
        }
      }, 1000 * 60 * 9); // every 9 minutes
    } else {
      console.warn('⚠️ mongoose.connection.db is undefined after connection');
    }

    app.listen(PORT, () =>
      console.log(`🚀 Server is running on port ${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
