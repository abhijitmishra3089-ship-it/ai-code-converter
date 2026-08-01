import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// console.log(process.env.GEMINI_API_KEY);
app.post("/convert", async (req, res) => {
  try {
    const { sourceLanguage, targetLanguage, code } = req.body;

    const prompt = `
Convert the following ${sourceLanguage} code into ${targetLanguage}.

Rules:
- Return ONLY the converted code.
- Do not add explanations.
- Keep the same functionality.

Code:
${code}
`;

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
      // satck:error.stack
      // error: "Conversion failed",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});