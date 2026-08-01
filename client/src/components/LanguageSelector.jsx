// src/components/LanguageSelector.jsx
import { swapLanguages } from "../utils/helpers";
import  {LANGUAGES} from "../utils/constants";
const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Rust",
];

const LanguageSelector = ({
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row gap-6 justify-between">
      
      {/* Source Language */}
      <div className="flex-1">
        <label className="block font-semibold mb-2">
          Source Language
        </label>

        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Target Language */}
      <div className="flex-1">
        <label className="block font-semibold mb-2">
          Target Language
        </label>

        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
       <button
  onClick={() =>
    swapLanguages(
      sourceLanguage,
      targetLanguage,
      setSourceLanguage,
      setTargetLanguage
    )
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  ⇄ Swap
</button>
    </div>
  );
};

export default LanguageSelector;