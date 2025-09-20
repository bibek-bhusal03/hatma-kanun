import { Request, Response } from "express";
import { Project } from "../models/Project";
import { IdGenerator } from "./utils/projectIdGenerator";

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    project
      ? res.json(project)
      : res.status(404).json({ message: "Project not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    project
      ? res.json(project)
      : res.status(404).json({ message: "Project not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    project
      ? res.json({ message: "Project deleted" })
      : res.status(404).json({ message: "Project not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
