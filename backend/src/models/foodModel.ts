import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  food: { type: String, required: true },
  quantity: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
