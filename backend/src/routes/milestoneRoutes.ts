import express from 'express';
import { getAllMilestones, addMilestone, updateMilestone } from '../controllers/milestoneController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllMilestones);
router.post('/', addMilestone);
// @ts-ignore
router.put('/:id', updateMilestone);

export default router;
