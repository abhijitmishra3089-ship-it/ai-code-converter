import Editor from "@monaco-editor/react";
import { getCharacterCount } from "../utils/helpers";
const CodeEditor = ({ language, code, setCode }) => {
  const totalCharacters=getCharacterCount(code)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-semibold">Source Code</h2>
        <span className="text-sm bg-slate-700 px-3 py-1 rounded">
          {language}
        </span>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="500px"
        language={language.toLowerCase()}
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          padding: {
            top: 10,
          },
        }}
      />
      <div className="flex justify-end bg-gray-100 px-4 py-2 text-sm text-gray-600">
  Characters: {totalCharacters}
</div>
    </div>
  );
};

export default CodeEditor;