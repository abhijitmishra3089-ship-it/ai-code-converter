import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  GitBranch,
  Sparkles,
  WandSparkles,
  Zap,
  Braces,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080b14] text-slate-100 selection:bg-violet-500/30">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-28">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />

          {/* Hero Content */}
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-violet-300 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              YOUR AI-POWERED CODING COMPANION
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.13] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
              Code in one language.
              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                Think in every language.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Translate code across programming languages in seconds. Keep
              your logic, understand every line, and ship with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                Start converting free
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-white/[0.06] hover:text-white"
              >
                See how it works
                <ArrowUpRight size={17} />
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-slate-800 pt-7">
              <div className="flex -space-x-2">
                {["A", "M", "J"].map((letter, index) => (
                  <div
                    key={letter}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#080b14] text-xs font-bold text-white ${
                      index === 0
                        ? "bg-violet-600"
                        : index === 1
                          ? "bg-blue-600"
                          : "bg-fuchsia-600"
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Built for curious developers
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  From first project to production code
                </p>
              </div>

              <div className="hidden h-9 w-px bg-slate-800 sm:block" />

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Check size={15} className="text-emerald-400" />
                No setup fees
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-600/15 via-transparent to-blue-600/15 blur-2xl" />

            <div className="absolute -left-3 top-12 z-20 hidden items-center gap-2 rounded-xl border border-slate-700 bg-[#151b2b] px-4 py-3 text-xs font-medium text-slate-200 shadow-xl sm:flex md:-left-10">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              JavaScript
              <ArrowRight size={13} className="text-slate-500" />
              Python
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0e1422] shadow-2xl shadow-black/40">
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-[#151b2b] px-4 py-4 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  convert-anything.js
                </span>

                <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE PREVIEW
                </span>
              </div>

              {/* Source Code */}
              <div className="overflow-x-auto px-3 py-5 font-mono text-xs leading-7 sm:px-5 sm:text-sm">
                <div className="flex min-w-max gap-5">
                  <div className="select-none text-right text-slate-600">
                    01<br />02<br />03<br />04<br />05
                  </div>

                  <div className="text-slate-300">
                    <div>
                      <span className="text-fuchsia-400">function</span>{" "}
                      <span className="text-blue-300">greet</span>(name) {"{"}
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-fuchsia-400">return</span>{" "}
                      <span className="text-emerald-300">
                        {`\`Hello, \${name}!\``}
                      </span>
                      ;
                    </div>
                    <div>{"}"}</div>
                    <div>&nbsp;</div>
                    <div>
                      <span className="text-blue-300">console</span>.log(
                      <span className="text-blue-300">greet</span>(
                      <span className="text-amber-300">"world"</span>));
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-800 bg-[#151b2b] px-4 py-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-yellow-400/10 px-2.5 py-1 text-[10px] font-bold text-yellow-300">
                    JS
                  </span>

                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="h-px w-5 bg-slate-600" />
                    <ArrowRight size={15} />
                    <span className="h-px w-5 bg-slate-600" />
                  </div>

                  <span className="rounded-md bg-blue-400/10 px-2.5 py-1 text-[10px] font-bold text-blue-300">
                    PY
                  </span>
                </div>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-400">
                  <Check size={12} />
                  Converted
                </span>
              </div>

              {/* Output Code */}
              <div className="px-3 py-5 sm:px-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-400/10 px-2 py-1 text-[10px] font-bold text-blue-300">
                      PY
                    </span>
                    <span className="text-xs text-slate-400">main.py</span>
                  </div>

                  <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    READY
                  </span>
                </div>

                <div className="overflow-x-auto font-mono text-xs leading-7 sm:text-sm">
                  <div className="flex min-w-max gap-5">
                    <div className="select-none text-right text-slate-600">
                      01<br />02
                    </div>

                    <div className="text-slate-300">
                      <div>
                        <span className="text-fuchsia-400">def</span>{" "}
                        <span className="text-blue-300">greet</span>(name):
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-fuchsia-400">return</span>{" "}
                        <span className="text-emerald-300">
                          {`f"Hello, {name}!"`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-3 z-20 flex items-center gap-2 rounded-xl border border-slate-700 bg-[#151b2b] px-4 py-3 text-xs font-medium text-slate-200 shadow-xl sm:-right-5">
              <Sparkles size={16} className="text-violet-400" />
              AI understands your logic
            </div>
          </div>
        </section>

        {/* Language Strip */}
        <section className="border-y border-slate-800/80 bg-white/[0.015]">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:justify-between lg:px-10">
            <span className="text-center text-[10px] font-bold tracking-[0.2em] text-slate-500">
              MADE FOR YOUR WORKFLOW
            </span>

            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:gap-x-10">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <Braces size={18} className="text-yellow-400" />
                JavaScript
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <Code2 size={18} className="text-blue-400" />
                Python
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <GitBranch size={18} className="text-orange-400" />
                Java
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <Zap size={18} className="text-violet-400" />
                C++
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <Sparkles size={18} className="text-emerald-400" />
                And many more
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
        >
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-violet-400">
              LESS FRICTION. MORE FLOW.
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Your next language is{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                closer than ever.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Everything you need to move between languages without losing
              your momentum.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article className="group rounded-2xl border border-slate-800 bg-[#0d1220] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-[#111629] sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                <WandSparkles size={23} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                AI that gets your code
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Convert logic with context-aware AI that aims to preserve
                behavior, structure, and intent.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-violet-300">
                Smart conversions
                <ArrowUpRight size={15} />
              </div>
            </article>

            <article className="group rounded-2xl border border-slate-800 bg-[#0d1220] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#111629] sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/20">
                <Code2 size={23} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Your editor, supercharged
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                A familiar code editor with syntax highlighting, readable
                output, copy, and download tools.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-300">
                Developer-first UI
                <ArrowUpRight size={15} />
              </div>
            </article>

            <article className="group rounded-2xl border border-slate-800 bg-[#0d1220] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-[#111629] sm:p-8 md:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500/20">
                <ShieldCheck size={23} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Your work, in one place
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Sign in to save conversions to your account and revisit your
                coding journey anytime.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                Personal workspace
                <ArrowUpRight size={15} />
              </div>
            </article>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="border-y border-slate-800/80 bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-violet-400">
                THREE STEPS. THAT'S IT.
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                From source to{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  solution.
                </span>
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Paste your code",
                  description:
                    "Start with a snippet or a whole function in your source language.",
                },
                {
                  number: "02",
                  title: "Choose a language",
                  description:
                    "Pick the target language and let AI handle the translation.",
                },
                {
                  number: "03",
                  title: "Copy and create",
                  description:
                    "Review your result, copy it, download it, or save it to history.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-800 bg-[#0d1220] p-6 transition hover:border-violet-500/40 sm:p-8"
                >
                  <span className="font-mono text-3xl font-bold text-violet-400/80">
                    {step.number}
                  </span>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <Sparkles size={25} />
            </div>

            <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to speak{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                another language?
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Your next great idea shouldn't be limited by syntax.
            </p>

            <Link
              to="/signup"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              Create your free account
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#080b14] px-5 py-7 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white">
              <Code2 size={20} />
            </span>

            <span className="text-lg font-bold tracking-tight text-white">
              CodeMorph
              <span className="text-violet-400">AI</span>
            </span>
          </Link>

          <p className="text-center text-xs text-slate-500">
            Built for builders. Powered by curiosity.
          </p>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} CodeMorph
          </p>
        </div>
      </footer>
    </div>
  );
}