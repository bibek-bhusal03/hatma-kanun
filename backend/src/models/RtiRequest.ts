import mongoose from "mongoose";

export interface RTIRequestDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId; // applicant
  fullName: string;
  fatherMotherName?: string;
  citizenshipNo?: string;
  address?: {
    provinceWard?: string;
    streetLocality?: string;
  };
  phoneEmail?: string;
  detailedRequest: string;
  attachments?: {
    name: string;
    filePath: string;
    fileType: string;
  }[];
  status: "Pending" | "Processed" | "Rejected";
  submittedDate: Date;
  processedDate?: Date;
  response?: string;
}

const rtiRequestSchema = new mongoose.Schema<RTIRequestDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  fatherMotherName: String,
  citizenshipNo: String,
  address: {
    provinceWard: String,
    streetLocality: String,
  },
  phoneEmail: String,
  detailedRequest: String,
  attachments: [
    {
      name: String,
      filePath: String,
      fileType: String,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Processed", "Rejected"],
    default: "Pending",
  },
  submittedDate: { type: Date, default: Date.now },
  processedDate: Date,
  response: String,
});

export const RTIRequest = mongoose.model<RTIRequestDocument>(
  "RTIRequest",
  rtiRequestSchema
);
