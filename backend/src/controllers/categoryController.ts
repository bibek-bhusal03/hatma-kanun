import { Request, Response } from "express";
import { Category } from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) res.json(category);
    else res.status(404).json({ message: "Category not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (category) res.json(category);
    else res.status(404).json({ message: "Category not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) res.json({ message: "Category deleted" });
    else res.status(404).json({ message: "Category not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
