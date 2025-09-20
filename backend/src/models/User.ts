import mongoose, { Schema, Document } from "mongoose";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone_no: number;
  is_email_verified: boolean;
  role: Role;
  status?: Status;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_no: { type: Number, required: true },
    is_email_verified: { type: Boolean, required: false, default: false },
    role: {
      type: String,
      enum: Object.values(Role),
      required: false,
      default: Role.USER,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      required: false,
      default: Status.ACTIVE,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
