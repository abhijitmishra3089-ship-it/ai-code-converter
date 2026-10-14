import Editor from "@monaco-editor/react";
import { Copy, FileCode2, Check } from "lucide-react";
import { useState } from "react";
import { languageToMonaco } from "../constants/Languages";

export default function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  title = "Source code",
  actions,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-slate-700/70 bg-[#111827] shadow-lg shadow-black/10">
      {/* Editor Header */}
      <div className="flex min-h-[56px] flex-wrap items-center justify-between gap-3 border-b border-slate-700/70 bg-[#151e2e] px-3 py-3 sm:px-4">
        {/* Title and Language */}
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-400">
            <FileCode2 size={17} />
          </span>

          <span className="max-w-[180px] truncate text-sm font-semibold text-slate-100 sm:max-w-none">
            {title}
          </span>

          <span className="rounded-md border border-slate-600/60 bg-slate-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {language || "Plain Text"}
          </span>

          {readOnly && (
            <span className="rounded-md bg-amber-400/10 px-2 py-1 text-[10px] font-medium text-amber-400">
              Read only
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {actions}

          <button
            type="button"
            title={copied ? "Copied!" : "Copy code"}
            aria-label={copied ? "Code copied" : "Copy code"}
            onClick={handleCopy}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600/60 bg-slate-800 text-slate-400 transition-all duration-200 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-95"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="min-w-0 bg-[#111827]">
        <Editor
          height="370px"
          language={languageToMonaco(language)}
          value={value ?? ""}
          onChange={(v) => onChange?.(v ?? "")}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 16, bottom: 12 },
            automaticLayout: true,
            tabSize: 2,
            roundedSelection: true,
            renderLineHighlight: "all",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            bracketPairColorization: { enabled: true },
            readOnlyMessage: {
              value: "This editor is read-only.",
            },
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/70 bg-[#151e2e] px-3 py-2 text-[11px] text-slate-500 sm:px-4">
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              readOnly ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          {readOnly ? "Read-only mode" : "Ready to edit"}
        </span>

        <span className="font-mono">
          {language || "Plain Text"}
        </span>
      </div>
    </section>
  );
}