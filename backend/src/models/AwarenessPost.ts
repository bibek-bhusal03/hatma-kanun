import mongoose, { Schema, Document } from "mongoose";

export interface IAwarenessPost extends Document {
  postTitle: string;
  category: string;
  shortDescription: string;
  mediaUrl: string;
  referenceSource: string;
  fullContent: string;
  scheduledDateTime?: Date;
  postedDateTime?: Date;
  status: "Scheduled" | "Posted";
  createdAt: Date;
}

const AwarenessPostSchema = new Schema<IAwarenessPost>({
  postTitle: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String },
  mediaUrl: { type: String },
  referenceSource: { type: String },
  fullContent: { type: String },
  scheduledDateTime: { type: Date },
  postedDateTime: { type: Date },
  status: { type: String, enum: ["Scheduled", "Posted"], default: "Scheduled" },
  createdAt: { type: Date, default: Date.now },
});

export const AwarenessPost = mongoose.model<IAwarenessPost>(
  "AwarenessPost",
  AwarenessPostSchema
);
