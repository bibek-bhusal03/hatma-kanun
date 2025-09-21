import { Request, Response } from "express";
import mongoose from "mongoose";
import { User, IUser } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByEmailOrId = async (req: Request, res: Response) => {
  try {
    const identifier = req.params.id;

    if (!identifier) {
      return res.status(400).json({ message: "Identifier is required" });
    }

    let user;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      user = await User.findById(identifier).select("-password");
    } else {
      user = await User.findOne({ email: identifier }).select("-password");
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updateData: Partial<IUser> = {};
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
