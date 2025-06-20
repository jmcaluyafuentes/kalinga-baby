import express from 'express';
import { addFoodEntry } from '../controllers/foodController';

const router = express.Router();

router.post('/', addFoodEntry);

export default router;
