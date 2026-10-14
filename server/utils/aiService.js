import { GoogleGenAI } from "@google/genai";
export async function generateConversion({
  sourceLanguage,
  targetLanguage,
  sourceCode,
}) {
  if (!process.env.GEMINI_API_KEY) {
    const err = new Error(
      "AI conversion is not configured. Add GEMINI_API_KEY to server/.env.",
    );
    err.status = 503;
    throw err;
  }
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `You are an expert software engineer. Convert the following ${sourceLanguage} code to ${targetLanguage}.
Preserve behavior and intent. Use idiomatic ${targetLanguage} syntax and standard libraries where practical.
Return only the converted source code, with no Markdown fences and no explanatory preamble.
If the source is ambiguous, make a reasonable best effort.

SOURCE LANGUAGE: ${sourceLanguage}
TARGET LANGUAGE: ${targetLanguage}

SOURCE CODE:
${sourceCode}`;
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
    });
    const output = response.text?.trim();
    if (!output) {
      const err = new Error(
        "The AI returned an empty response. Please try again.",
      );
      err.status = 502;
      throw err;
    }
    return output.replace(/^```[\w+-]*\s*/i, "").replace(/\s*```$/, "");
  } catch (err) {
    if (err.status) throw err;
    console.error("Gemini API error:", err.message);
    const error = new Error(
      "AI conversion failed. Verify your Gemini API key, model, and quota.",
    );
    error.status = 502;
    throw error;
  }
}
