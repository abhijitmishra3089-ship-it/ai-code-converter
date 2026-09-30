import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import ConnectDb from "./config/db.js";
import authRoutes from './Routes/AuthRoutes.js'
const app = express();
ConnectDb();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// console.log(process.env.GEMINI_API_KEY);
app.post("/convert", async (req, res) => {
  try {
    const { sourceLanguage, targetLanguage, code } = req.body;
    const prompt = `
Convert the following ${sourceLanguage} code into ${targetLanguage}.${code}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    res.json({
      result: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});