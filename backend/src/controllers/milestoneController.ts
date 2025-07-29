import { Request, Response } from 'express';
import Milestone from '../models/milestoneModel';

interface AuthRequest extends Request {
  user?: any;
}

export const getAllMilestones = async (req: AuthRequest, res: Response) => {
  const milestones = await Milestone.find({ user: req.user._id });
  res.json(milestones);
};

export const addMilestone = async (req: AuthRequest, res: Response) => {
  const newMilestone = new Milestone({
    ...req.body,
    userAdded: true,
    user: req.user._id
  });
  await newMilestone.save();
  res.status(201).json(newMilestone);
};

export const updateMilestone = async (req: AuthRequest, res: Response) => {
  const milestone = await Milestone.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!milestone) {
    return res.status(404).json({ message: 'Milestone not found or not yours' });
  }

  res.json(milestone);
};
