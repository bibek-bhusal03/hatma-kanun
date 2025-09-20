import { Request, Response } from "express";
import { AwarenessPost } from "../models/AwarenessPost";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await AwarenessPost.create(req.body);
    res.status(201).json(post);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all posts with populated category
export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await AwarenessPost.find().populate("category");
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await AwarenessPost.findById(req.params.id).populate(
      "category"
    );
    if (post) res.json(post);
    else res.status(404).json({ message: "Post not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await AwarenessPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category");
    if (post) res.json(post);
    else res.status(404).json({ message: "Post not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await AwarenessPost.findByIdAndDelete(req.params.id);
    if (post) res.json({ message: "Post deleted" });
    else res.status(404).json({ message: "Post not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
