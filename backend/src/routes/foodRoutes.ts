import express from 'express';
import { addFoodEntry, getEntriesBetweenDates } from '../controllers/foodController';

const router = express.Router();

router.post('/', addFoodEntry);
router.get('/range', getEntriesBetweenDates);

export default router;
