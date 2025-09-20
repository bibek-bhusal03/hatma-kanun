import mongoose, { Document, Schema } from "mongoose";
import { IdGenerator } from "../controllers/utils/projectIdGenerator";

export interface IExpense {
  date: Date;
  spentBy: string;
  receivedBy: string;
  purpose: string;
  amount: number;
  attachment?: string;
}

export interface IUpdateHistory {
  date: Date;
  updatedBy: string;
  changes: string;
}

export interface IProject extends Document {
  projectId: string;
  projectName: string;
  status: string;
  percentageCompletion: number;
  budget: number;
  startDate: Date;
  endDate: Date;
  expenses: IExpense[];
  updateHistory: IUpdateHistory[];
}

const projectSchema = new Schema<IProject>(
  {
    projectId: { type: String, required: true },
    projectName: { type: String, required: true },
    status: { type: String, required: true },
    percentageCompletion: { type: Number, default: 0 },
    budget: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    expenses: [
      {
        date: { type: Date, required: true },
        spentBy: { type: String, required: true },
        receivedBy: { type: String, required: true },
        purpose: { type: String, required: true },
        amount: { type: Number, required: true },
        attachment: { type: String },
      },
    ],
    updateHistory: [
      {
        date: { type: Date, required: true },
        updatedBy: { type: String, required: true },
        changes: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const projectIdGenerator = new IdGenerator({
  prefix: "P",
  include_year: true,
});

// Pre-save hook to auto-generate projectId
projectSchema.pre("save", async function (next) {
  if (!this.projectId) {
    const count = await mongoose.model<IProject>("Project").countDocuments();
    this.projectId = projectIdGenerator.execute(count);
  }
  next();
});

export const Project = mongoose.model<IProject>("Project", projectSchema);
