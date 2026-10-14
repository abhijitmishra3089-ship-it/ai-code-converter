import Editor from "@monaco-editor/react";
import {
  Check,
  Copy,
  Download,
  Sparkles,
  FileCode2,
} from "lucide-react";
import { useState } from "react";
import { languageToMonaco } from "../constants/Languages";

const extensions = {
  JavaScript: "js",
  TypeScript: "ts",
  Python: "py",
  Java: "java",
  "C++": "cpp",
  "C#": "cs",
  Go: "go",
  Rust: "rs",
  PHP: "php",
  Ruby: "rb",
  HTML: "html",
  CSS: "css",
  SQL: "sql",
};

export default function OutputEditor({ value = "", language = "JavaScript" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(true);

      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Unable to copy code:", error);
    }
  };

  const download = () => {
    const blob = new Blob([value || ""], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `converted-code.${extensions[language] || "txt"}`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1020] shadow-xl shadow-black/10">

      {/* Editor header */}
      <div className="flex flex-col gap-3 border-b border-slate-800 bg-slate-900/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

        {/* Title and language */}
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
            <Sparkles size={17} />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">
              Converted output
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              Your generated code
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <FileCode2 size={13} />
            {language}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copy}
            disabled={!value}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
              copied
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 bg-slate-800/80 text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
            }`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            type="button"
            onClick={download}
            disabled={!value}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-600/10 transition duration-200 hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download size={15} />
            Download
          </button>
        </div>
      </div>

      {/* Monaco editor */}
      <div className="min-w-0 bg-[#0b1020]">
        {value ? (
          <Editor
            height="370px"
            language={languageToMonaco(language)}
            value={value}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              padding: { top: 16, bottom: 16 },
              automaticLayout: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              renderLineHighlight: "none",
              contextmenu: true,
            }}
          />
        ) : (
          <div className="flex h-[370px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/70 text-slate-500">
              <FileCode2 size={26} />
            </div>

            <h4 className="text-sm font-semibold text-slate-300">
              No converted code yet
            </h4>

            <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
              Your converted code will appear here once you run the converter.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 bg-slate-900/40 px-4 py-3 text-xs text-slate-500 sm:px-5">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Read-only editor
        </span>

        <span>
          {value ? value.split("\n").length : 0} lines
        </span>
      </div>
    </section>
  );
}
