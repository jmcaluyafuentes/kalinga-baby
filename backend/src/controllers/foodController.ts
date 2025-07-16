import { Request, Response } from 'express';
import Food from '../models/foodModel';

export const addFoodEntry = async (req: Request, res: Response) => {
  const { food, quantity, date, time, notes } = req.body;

  try {
    if (!food || !quantity || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newEntry = new Food({
      food,
      quantity,
      date,
      time,
      notes,
      user: req.user?.id,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add food entry', error: err });
  }
};


export const getEntriesByDate = async (req: Request, res: Response) => {
  const date = req.params.date;

  try {
    const entries = await Food.find({ date });

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries.', error: err });
  }
}

export const getEntriesBetweenDates = async (req: Request, res: Response) => {
  const { start, end } = req.query;

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

export const getEntriesAll = async (req: Request, res: Response) => {
  try {
    const entries = await Food.find({});
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries.', error: err });
  }
}

export const getEntryById = async (req: Request, res: Response) => {
  try {
    const entry = await Food.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch the entry.', error: err });
  }
}

export const updateEntry = async (req: Request, res: Response) => {
  try {
    const updated = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete' });
  }
}
