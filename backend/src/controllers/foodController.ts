import { Request, Response } from 'express';
import Food from '../models/foodModel';

export const addFoodEntry = async (req: Request, res: Response) => {
  const { food, quantity, date, time } = req.body;
  try {
    if (!food || !quantity || !date || !time) {
      res.status(400).json({ message: 'Missing required fields.' });
    }

    const newEntry = new Food(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add food entry', error: err });
  }
}

export const getEntriesByDate = async (req: Request, res: Response) => {
  const date = req.params.date;

  console.log('Date:', date);


  try {
    const entries = await Food.find({ date });

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries.', error: err });
  }
}

export const getEntriesBetweenDates = async (req: Request, res: Response) => {
  const { start, end } = req.query;

  console.log('Start:', start, 'End:', end);


  if (!start || !end) {
    return res.status(400).json({ message: 'Start and end dates are required.' });
  }

  try {
    const entries = await Food.find({
      date: { $gte: start, $lte: end }
    });
    
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries between dates.', error: err });
  }
}
