import mongoose, { Schema, Document } from "mongoose";
import { ISifarisType } from "./sifarisType";
import { IUser } from "./User";

export interface IApplication extends Document {
  userId: IUser["_id"];
  sifarisType: ISifarisType["_id"];
  applicantName: string;
  fatherMotherName: string;
  citizenshipNo: string;
  address: {
    ward: string;
    streetLocality: string;
  };
  purposeReason: string;
  documents: {
    name: string;
    filePath: string;
    fileType: string;
    isMandatory: boolean;
  }[];
  status: "Pending" | "Approved" | "Rejected";
  pdfPath?: string;
  pdfUrl?: string;
  submittedDate: Date;
  processedDate?: Date;
  remarks?: string;
}

const ApplicationSchema = new Schema<IApplication>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sifarisType: {
    type: Schema.Types.ObjectId,
    ref: "SifarisType",
    required: true,
  },
  applicantName: String,
  fatherMotherName: String,
  citizenshipNo: String,
  address: {
    ward: String,
    streetLocality: String,
  },
  purposeReason: String,
  documents: [
    {
      name: String,
      filePath: String,
      fileType: String,
      isMandatory: { type: Boolean, default: false },
    },
  ],
  pdfPath: { type: String },
  pdfUrl: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  submittedDate: { type: Date, default: Date.now },
  processedDate: Date,
  remarks: String,
});

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
