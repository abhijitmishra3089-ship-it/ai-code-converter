import Conversion from "../models/Conversion.js";
import { generateConversion } from "../utils/aiService.js";
const supported = new Set(["JavaScript","TypeScript","Python","Java","C++","C#","Go","Rust","PHP","Ruby","Swift","Kotlin","SQL","HTML","CSS"]);
export async function createConversion(req, res, next) {
  try {
    const { sourceLanguage, targetLanguage, sourceCode } = req.body;
    if (!supported.has(sourceLanguage) || !supported.has(targetLanguage)) return res.status(400).json({ message: "Select supported source and target languages." });
    if (sourceLanguage === targetLanguage) return res.status(400).json({ message: "Source and target languages must be different." });
    if (typeof sourceCode !== "string" || !sourceCode.trim()) return res.status(400).json({ message: "Source code is required." });
    if (sourceCode.length > 50000) return res.status(413).json({ message: "Source code must be 50,000 characters or fewer." });
    const outputCode = await generateConversion({ sourceLanguage, targetLanguage, sourceCode });
    const conversion = await Conversion.create({ user: req.user._id, sourceLanguage, targetLanguage, sourceCode, outputCode });
    res.status(201).json({ message: "Code converted successfully.", conversion });
  } catch (err) { next(err); }
}
export async function listConversions(req, res, next) {
  try { const conversions = await Conversion.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(100).lean(); res.json({ conversions }); }
  catch (err) { next(err); }
}
export async function removeConversion(req, res, next) {
  try {
    const conversion = await Conversion.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!conversion) return res.status(404).json({ message: "Conversion not found." });
    res.json({ message: "Conversion deleted." });
  } catch (err) { if (err.name === "CastError") return res.status(404).json({ message: "Conversion not found." }); next(err); }
}