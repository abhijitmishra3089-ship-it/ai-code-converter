export const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "SQL",
  "HTML",
  "CSS",
];
export const languageToMonaco = (language) =>
  {
    const languageMap = {
    "C++": "cpp",
    "C#": "csharp",
    JavaScript: "javascript",
    TypeScript: "typescript",
    Python: "python",
    PHP: "php",
    Ruby: "ruby",
    Go: "go",
    Rust: "rust",
    SQL: "sql",
    HTML: "html",
    CSS: "css",
    Java: "java",
    Swift: "swift",
    Kotlin: "kotlin",
  };
  return languageMap[language] || "plaintext";
}