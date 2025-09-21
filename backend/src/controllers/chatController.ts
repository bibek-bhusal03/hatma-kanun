import { Request, Response } from "express";
import { env } from "../../env";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const chatController = async (req: Request, res: Response) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ generatedText: text });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
};
