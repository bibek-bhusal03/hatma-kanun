import mongoose, { Schema, Document } from "mongoose";
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
  category: mongoose.Types.ObjectId;
  status: string;
  percentageCompletion: number;
  budget: number;
  startDate: Date;
  endDate: Date;
  wardLocation: string;
  latitude: number;
  longitude: number;
  responsibleParty: string;
  responsiblePartyContact: string;
  allocatedBudget: number;
  fundSource: string;
  beneficiaries: number;
  photos: string[];
  referenceDocs: string[];
  expenses: IExpense[];
  updateHistory: IUpdateHistory[];
}

const ExpenseSchema = new Schema<IExpense>({
  date: Date,
  spentBy: String,
  receivedBy: String,
  purpose: String,
  amount: Number,
  attachment: String,
});

const UpdateHistorySchema = new Schema<IUpdateHistory>({
  date: Date,
  updatedBy: String,
  changes: String,
});

const ProjectSchema = new Schema<IProject>({
  projectId: { type: String },
  projectName: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  status: String,
  percentageCompletion: Number,
  budget: Number,
  startDate: Date,
  endDate: Date,
  wardLocation: String,
  latitude: Number,
  longitude: Number,
  responsibleParty: String,
  responsiblePartyContact: String,
  allocatedBudget: Number,
  fundSource: String,
  beneficiaries: Number,
  photos: [String],
  referenceDocs: [String],
  expenses: [ExpenseSchema],
  updateHistory: [UpdateHistorySchema],
});

const projectIdGenerator = new IdGenerator({
  prefix: "P",
  include_year: true,
});

// Pre-save hook to auto-generate projectId
ProjectSchema.pre("save", async function (next) {
  if (!this.projectId) {
    const count = await mongoose.model<IProject>("Project").countDocuments();
    this.projectId = projectIdGenerator.execute(count);
  }
  next();
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
