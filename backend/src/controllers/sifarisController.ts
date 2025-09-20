import { Request, Response } from "express";
import { SifarisType } from "../models/sifarisType";

// Create new Sifaris Type
export const createSifarisType = async (req: Request, res: Response) => {
  try {
    const type = await SifarisType.create(req.body);
    res.status(201).json(type);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Sifaris Types
export const getSifarisTypes = async (_req: Request, res: Response) => {
  try {
    const types = await SifarisType.find();
    res.json(types);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Sifaris Type by ID
export const getSifarisTypeById = async (req: Request, res: Response) => {
  try {
    const type = await SifarisType.findById(req.params.id);
    if (type) res.json(type);
    else res.status(404).json({ message: "Sifaris Type not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update Sifaris Type
export const updateSifarisType = async (req: Request, res: Response) => {
  try {
    const type = await SifarisType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (type) res.json(type);
    else res.status(404).json({ message: "Sifaris Type not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Sifaris Type
export const deleteSifarisType = async (req: Request, res: Response) => {
  try {
    const type = await SifarisType.findByIdAndDelete(req.params.id);
    if (type) res.json({ message: "Sifaris Type deleted" });
    else res.status(404).json({ message: "Sifaris Type not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
