import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import foodRoutes from './routes/foodRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Kalinga Baby app.')
});

app.get('/ping', (req, res) => {
  res.send('pong')
});

app.use('/api/foods', foodRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Backend server is running on port ${PORT}.`));
  })
  .catch((err) => console.error(err));
