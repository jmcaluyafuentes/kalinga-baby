import express from 'express';
import { addFoodEntry, getEntriesByDate, getEntriesBetweenDates } from '../controllers/foodController';

const router = express.Router();

router.post('/', addFoodEntry);
// @ts-ignore
router.get('/range', getEntriesBetweenDates);
router.get('/:date', getEntriesByDate);

export default router;
