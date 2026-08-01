// Copy text to clipboard
export const copyToClipboard = async (text) => {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } catch (error) {
    console.error(error);
    alert("Failed to copy.");
  }
};

// Download code as a file
export const downloadCode = (
  code,
  language = "txt",
  fileName = "converted-code"
) => {
  if (!code) return;

  const blob = new Blob([code], { type: "text/plain" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.${language}`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Clear editor
export const clearEditor = (setInputCode, setOutputCode) => {
  setInputCode("");
  setOutputCode("");
};

// Swap source & target languages
export const swapLanguages = (
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage
) => {
  setSourceLanguage(targetLanguage);
  setTargetLanguage(sourceLanguage);
};

// Count lines
export const getLineCount = (code = "") => {
  return code.split("\n").length;
};

// Count characters
export const getCharacterCount = (code = "") => {
  return code.length;
};

// Count words
export const getWordCount = (code = "") => {
  return code.trim() === ""
    ? 0
    : code.trim().split(/\s+/).length;
};