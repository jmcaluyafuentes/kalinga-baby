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
router.get("/range", authMiddleware, getEntriesBetweenDates);
router.get("/date/:date", authMiddleware, getEntriesByDate);
router.get("/", authMiddleware, getEntriesAll);
// @ts-ignore
router.get("/:id", authMiddleware, getEntryById);
// @ts-ignore
router.put("/:id", authMiddleware, updateEntry);
// @ts-ignore
router.delete("/:id", authMiddleware, deleteEntry);

export default router;
