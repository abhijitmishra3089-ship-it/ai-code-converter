const API_URL = "http://localhost:5000/convert";

export async function convertCode({
  sourceLanguage,
  targetLanguage,
  code,
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sourceLanguage,
      targetLanguage,
      code,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Conversion failed");
  }

  return data.result;
}