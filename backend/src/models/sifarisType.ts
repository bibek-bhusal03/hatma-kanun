import mongoose, { Schema, Document } from "mongoose";

export interface ISifarisType extends Document {
  name: string;
}

const SifarisTypeSchema = new Schema<ISifarisType>({
  name: { type: String, required: true, unique: true },
});

export const SifarisType = mongoose.model<ISifarisType>(
  "SifarisType",
  SifarisTypeSchema
);
