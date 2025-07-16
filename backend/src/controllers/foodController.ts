import { Request, Response } from 'express';
import Food from '../models/foodModel';

// Custom request type with user added by authMiddleware
interface AuthRequest extends Request {
  user?: { id: string };
}

export const addFoodEntry = async (req: AuthRequest, res: Response) => {
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

export const getEntriesByDate = async (req: AuthRequest, res: Response) => {
  const date = req.params.date;

  try {
    const entries = await Food.find({ date, user: req.user?.id });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries.', error: err });
  }
};

export const getEntriesBetweenDates = async (req: AuthRequest, res: Response) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: 'Start and end dates are required.' });
  }

  try {
    const entries = await Food.find({
      date: { $gte: start, $lte: end },
      user: req.user?.id,
    });

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries between dates.', error: err });
  }
};

export const getEntriesAll = async (req: AuthRequest, res: Response) => {
  try {
    const entries = await Food.find({ user: req.user?.id });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries.', error: err });
  }
};

export const getEntryById = async (req: AuthRequest, res: Response) => {
  try {
    const entry = await Food.findOne({ _id: req.params.id, user: req.user?.id });
    if (!entry) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch the entry.', error: err });
  }
};

export const updateEntry = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await Food.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Not found or unauthorized' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const deleteEntry = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await Food.findOneAndDelete({ _id: req.params.id, user: req.user?.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Not found or unauthorized' });
    }
    res.status(200).json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete' });
  }
};
