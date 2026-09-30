const API_URL = "http://localhost:5000";

export async function convertCode({ sourceLanguage, targetLanguage, code }) {
  const response = await fetch(`${API_URL}/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sourceLanguage, targetLanguage, code }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Conversion failed");
  }
  return data.result;
}

export async function registerUser({ name, email, password, age, phone }) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, age, phone }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}
export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}
