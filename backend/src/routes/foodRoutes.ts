import express from "express";
import {
  addFoodEntry,
  getEntriesByDate,
  getEntriesBetweenDates,
  getEntriesAll,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/foodController";
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// @ts-ignore
router.post("/", authMiddleware, addFoodEntry);
// @ts-ignore
router.get("/range", getEntriesBetweenDates);
router.get("/date/:date", getEntriesByDate);
router.get("/", getEntriesAll);
// @ts-ignore
router.get("/:id", getEntryById);
// @ts-ignore
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
