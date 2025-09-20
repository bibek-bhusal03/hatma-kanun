import mongoose, { Schema, Document } from "mongoose";

export interface IAwarenessPost extends Document {
  postTitle: string;
  category: mongoose.Types.ObjectId;
  shortDescription?: string;
  mediaUrl?: string;
  referenceSource?: string;
  fullContent?: string;
  scheduledDateTime?: Date;
  postedDateTime?: Date;
  status: "Scheduled" | "Posted";
  createdAt: Date;
}

const AwarenessPostSchema = new Schema<IAwarenessPost>({
  postTitle: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  shortDescription: String,
  mediaUrl: String,
  referenceSource: String,
  fullContent: String,
  scheduledDateTime: Date,
  postedDateTime: Date,
  status: { type: String, enum: ["Scheduled", "Posted"], default: "Scheduled" },
  createdAt: { type: Date, default: Date.now },
});

export const AwarenessPost = mongoose.model<IAwarenessPost>(
  "AwarenessPost",
  AwarenessPostSchema
);
