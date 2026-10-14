import { useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  LoaderCircle,
  Sparkles,
  WandSparkles,
  Code2,
  ShieldCheck,
} from "lucide-react";

import CodeEditor from "../components/CodeEditor";
import OutputEditor from "../components/OutputEditor";
import LanguageSelector from "../components/LanguageSelector";
import { convertCode } from "../services/converterApi";

const starter = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));`;

export default function Converter() {
  const [sourceLanguage, setSourceLanguage] =
    useState("JavaScript");

  const [targetLanguage, setTargetLanguage] =
    useState("Python");

  const [sourceCode, setSourceCode] =
    useState(starter);

  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const swap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);

    if (output.trim()) {
      setSourceCode(output);
    }

    setOutput("");
    setError("");
    setNotice("");
  };

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      setError("Paste some code before converting.");
      setNotice("");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setError("Choose two different languages.");
      setNotice("");
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");
    setOutput("");

    try {
      const result = await convertCode({
        sourceLanguage,
        targetLanguage,
        sourceCode,
      });

      const convertedCode =
        result.conversion?.outputCode ||
        result.outputCode ||
        "";

      if (!convertedCode.trim()) {
        throw new Error("The AI returned an empty conversion.");
      }

      setOutput(convertedCode);

      setNotice(
        "Conversion complete. Review the output before using it."
      );
    } catch (e) {
      setError(
        e.response?.data?.message ||
          e.message ||
          "Conversion failed. Check your server and AI API key."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-7 text-slate-100 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1600px]">

        {/* Page heading */}
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              <Sparkles size={15} />
              AI-powered workspace
            </div>

            <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Code converter
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                <Sparkles size={21} />
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Translate your logic across programming languages.
              Your next idea starts here.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2.5 text-sm font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Workspace ready
          </div>
        </header>

        {/* Language toolbar */}
        <section className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">

            <div className="grid min-w-0 flex-1 grid-cols-1 items-end gap-4 md:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)]">

              {/* Source language */}
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400">
                  <Code2 size={15} className="text-cyan-400" />
                  SOURCE LANGUAGE
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0b1020] p-3 transition focus-within:border-cyan-400/40">
                  <LanguageSelector
                    label="SOURCE LANGUAGE"
                    value={sourceLanguage}
                    onChange={(value) => {
                      setSourceLanguage(value);
                      setError("");
                      setNotice("");
                    }}
                    exclude={targetLanguage}
                  />
                </div>
              </div>

              {/* Swap button */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  title="Swap languages"
                  aria-label="Swap source and target languages"
                  onClick={swap}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 active:scale-95"
                >
                  <ArrowDownUp size={19} />
                </button>
              </div>

              {/* Target language */}
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400">
                  <WandSparkles
                    size={15}
                    className="text-violet-400"
                  />
                  TARGET LANGUAGE
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0b1020] p-3 transition focus-within:border-violet-400/40">
                  <LanguageSelector
                    label="TARGET LANGUAGE"
                    value={targetLanguage}
                    onChange={(value) => {
                      setTargetLanguage(value);
                      setError("");
                      setNotice("");
                    }}
                    exclude={sourceLanguage}
                  />
                </div>
              </div>
            </div>

            {/* Convert button */}
            <button
              type="button"
              onClick={handleConvert}
              disabled={busy}
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:from-cyan-300 hover:to-blue-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 xl:w-auto"
            >
              {busy ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Converting...
                </>
              ) : (
                <>
                  <WandSparkles size={18} />
                  Convert code
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>
        </section>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.07] p-4 text-sm leading-6 text-red-300"
          >
            <CircleAlert
              size={19}
              className="mt-0.5 shrink-0"
            />
            <p className="flex-1">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="text-red-300 transition hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Success message */}
        {notice && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4 text-sm leading-6 text-emerald-300"
          >
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />
            <p>{notice}</p>
          </div>
        )}

        {/* Editors */}
        <section className="grid min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-2">

          {/* Source editor */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] transition hover:border-cyan-400/20">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Code2 size={18} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white">
                    Source code
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Write or paste your code
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.08] px-2.5 py-1.5 text-xs font-semibold text-cyan-300">
                {sourceLanguage}
              </span>
            </div>

            <div className="min-w-0 p-2 sm:p-3">
              <CodeEditor
                value={sourceCode}
                onChange={(value) => {
                  setSourceCode(value);
                  setError("");
                  setNotice("");
                }}
                language={sourceLanguage}
                title="Source code"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 text-xs text-slate-500 sm:px-5">
              <span>Input editor</span>
              <span>{sourceCode.length} characters</span>
            </div>
          </div>

          {/* Output editor */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1220] transition hover:border-violet-400/20">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <WandSparkles size={18} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white">
                    Converted output
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your translated code appears here
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-lg border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1.5 text-xs font-semibold text-violet-300">
                {targetLanguage}
              </span>
            </div>

            <div className="min-w-0 p-2 sm:p-3">
              {busy ? (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#080b14] px-4 text-center sm:min-h-80">
                  <LoaderCircle
                    size={32}
                    className="animate-spin text-violet-400"
                  />
                  <p className="mt-4 text-sm font-semibold text-white">
                    Translating your code
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Please wait while the conversion is in progress.
                  </p>
                </div>
              ) : output ? (
                <OutputEditor
                  value={output}
                  language={targetLanguage}
                />
              ) : (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#080b14] px-5 text-center sm:min-h-80">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-300">
                    <Sparkles size={25} />
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-white">
                    Your output will appear here
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-6 text-slate-500">
                    Choose your target language and click
                    Convert code to get started.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 text-xs text-slate-500 sm:px-5">
              <span>Output editor</span>
              <span>{output.length} characters</span>
            </div>
          </div>
        </section>

        {/* Information row */}
        <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <Sparkles
              size={17}
              className="mt-0.5 shrink-0 text-cyan-400"
            />
            <p className="text-xs leading-5 text-slate-400">
              AI-generated output may need review and testing.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <Clock3
              size={17}
              className="mt-0.5 shrink-0 text-violet-400"
            />
            <p className="text-xs leading-5 text-slate-400">
              Successful conversions are saved to your history
              when supported by your backend.
            </p>
          </div>
        </section>

        {/* Tip section */}
        <section className="mt-6 flex items-start gap-4 rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.05] to-violet-400/[0.04] p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white sm:text-base">
              Get a better conversion
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
              Include complete functions, meaningful variable
              names, and important context in your source code.
              Always test the generated code before using it in
              production.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
