import mongoose, { Schema, Document, Types } from "mongoose";
import { MilestoneType } from "../types/express/milestone";

interface MilestoneDocument extends MilestoneType, Document {
  user: Types.ObjectId;
}

const milestoneSchema = new Schema<MilestoneDocument>({
  title: { type: String, required: true },
  description: String,
  expectedAge: { type: String, required: true },
  achieved: { type: Boolean, required: true },
  dateAchieved: String,
  userAdded: { type: Boolean, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Milestone = mongoose.model<MilestoneDocument>(
  "Milestone",
  milestoneSchema
);

export default Milestone;
