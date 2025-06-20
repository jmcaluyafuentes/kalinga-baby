import { Request, Response } from 'express';
import Food from '../models/foodModel';

export const addFoodEntry = async (req: Request, res: Response) => {
  try {
    const newEntry = new Food(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add food entry', error: err });
  }
}
