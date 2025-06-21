import express from 'express';
import { addFoodEntry, getEntriesByDate, getEntriesBetweenDates } from '../controllers/foodController';

const router = express.Router();

router.post('/', addFoodEntry);
router.get('/:date', getEntriesByDate);
// @ts-ignore
router.get('/range', getEntriesBetweenDates);
router.get('/range', (req, res) => {
  console.log('Range route hit');
  res.json([]);
});


export default router;
