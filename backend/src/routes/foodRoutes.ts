import express from "express";
import {
  addFoodEntry,
  getEntriesByDate,
  getEntriesBetweenDates,
  getEntriesAll,
} from "../controllers/foodController";

const router = express.Router();

router.post("/", addFoodEntry);
// @ts-ignore
router.get("/range", getEntriesBetweenDates);
router.get("/:date", getEntriesByDate);
router.get("/", getEntriesAll);

export default router;
