import Editor from "@monaco-editor/react";

const OutputEditor = ({ language, code }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-green-700 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-semibold">Converted Code</h2>

        <span className="text-sm bg-green-600 px-3 py-1 rounded">
          {language}
        </span>
      </div>

      {/* Read Only Monaco Editor */}
      <Editor
        height="500px"
        language={language.toLowerCase()}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          lineNumbers: "on",
          tabSize: 2,
          padding: {
            top: 10,
          },
        }}
      />
    </div>
  );
};

export default OutputEditor;