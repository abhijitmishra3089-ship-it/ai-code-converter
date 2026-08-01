import { useState } from "react";
import { convertCode } from "../services/api";

const useCodeConverter = () => {
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [targetLanguage, setTargetLanguage] = useState("python");

  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      alert("Please enter some code.");
      return;
    }

    try {
      setLoading(true);

      const result = await convertCode({
        sourceLanguage,
        targetLanguage,
        code: inputCode,
      });

      setOutputCode(result);
    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return {
    sourceLanguage,
    setSourceLanguage,

    targetLanguage,
    setTargetLanguage,

    inputCode,
    setInputCode,

    outputCode,
    setOutputCode,

    loading,

    handleConvert,
  };
};

export default useCodeConverter;