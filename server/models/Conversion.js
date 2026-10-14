import mongoose from "mongoose";
const conversionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  sourceLanguage: { type: String, required: true, trim: true },
  targetLanguage: { type: String, required: true, trim: true },
  sourceCode: { type: String, required: true, maxlength: 50000 },
  outputCode: { type: String, required: true, maxlength: 100000 }
}, { timestamps: true });
export default mongoose.model("Conversion", conversionSchema);