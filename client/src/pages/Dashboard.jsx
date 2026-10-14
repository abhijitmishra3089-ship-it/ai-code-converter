import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeftRight,
  Code2,
  Clock3,
  Sparkles,
  Plus,
  History,
  Braces,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../services/converterApi";

export default function Dashboard() {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const data = await getHistory();

        if (!cancelled) {
          setItems(data.conversions || []);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message ||
              "History will appear here after your first conversion."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();

    return hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening";
  };

  const firstName = user?.name?.split(" ")[0] || "Developer";

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-7 text-slate-100 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome heading */}
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Your developer workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {greeting()},{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                {firstName}
              </span>{" "}
              <span className="inline-block text-cyan-400">✦</span>
            </h1>

            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Ready to turn a little code into something great?
            </p>
          </div>

          <Link
            to="/converter"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 active:scale-[0.98] sm:w-auto"
          >
            <Plus size={18} />
            New conversion
          </Link>
        </header>

        {/* Hero section */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151a36] via-[#101426] to-[#11102b] p-6 sm:p-8 lg:p-12">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

            {/* Hero text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-bold tracking-wide text-violet-300">
                <Sparkles size={15} />
                AI CODE WORKSPACE
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your ideas don't speak just{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  one language.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                Convert code, explore new syntax, and keep your
                best work close at hand. Make your next coding
                idea happen faster.
              </p>

              <Link
                to="/converter"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-100 active:scale-[0.98]"
              >
                Open code converter
                <ArrowRight size={17} />
              </Link>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Your workspace
                </span>

                <span className="flex items-center gap-2">
                  <Code2 size={14} className="text-cyan-400" />
                  Multiple languages
                </span>
              </div>
            </div>

            {/* Code preview */}
            <div className="min-w-0 rounded-2xl border border-white/10 bg-[#080b14]/90 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="text-xs text-slate-400">
                  translate.ts
                </span>

                <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs font-bold text-cyan-300">
                  TS
                </span>
              </div>

              <div className="overflow-x-auto px-4 py-6 font-mono text-xs leading-8 sm:px-6 sm:text-sm">
                <p className="whitespace-nowrap">
                  <span className="mr-5 text-slate-600">01</span>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-cyan-300">idea</span>{" "}
                  <span className="text-slate-300">=</span>{" "}
                  <span className="text-emerald-300">
                    "anything";
                  </span>
                </p>

                <p className="whitespace-nowrap">
                  <span className="mr-5 text-slate-600">02</span>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-cyan-300">result</span>{" "}
                  <span className="text-slate-300">=</span>{" "}
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-blue-300">
                    translate
                  </span>
                  <span className="text-slate-300">(idea);</span>
                </p>

                <p className="whitespace-nowrap">
                  <span className="mr-5 text-slate-600">03</span>
                  <span className="text-violet-400">return</span>{" "}
                  <span className="text-cyan-300">result</span>
                  <span className="text-slate-300">.</span>
                  <span className="text-emerald-300">
                    possibilities
                  </span>
                  <span className="text-slate-300">;</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/[0.08] px-4 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  AI engine ready
                </span>

                <span className="flex items-center gap-2 text-cyan-300">
                  <Sparkles size={14} />
                  Code, reimagined
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick start heading */}
        <section className="mb-5">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Quick start
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Jump straight into your workflow.
          </p>
        </section>

        {/* Quick start cards */}
        <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Link
            to="/converter"
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-400/[0.05]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
              <ArrowLeftRight size={22} />
            </span>

            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-white">
                Convert code
              </strong>
              <small className="mt-1 block text-xs leading-5 text-slate-400">
                Translate between languages
              </small>
            </span>

            <ArrowUpRight
              size={18}
              className="shrink-0 text-slate-500 transition group-hover:text-violet-300"
            />
          </Link>

          <Link
            to="/history"
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-400/[0.05]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
              <History size={22} />
            </span>

            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-white">
                Recent history
              </strong>
              <small className="mt-1 block text-xs leading-5 text-slate-400">
                Pick up where you left off
              </small>
            </span>

            <ArrowUpRight
              size={18}
              className="shrink-0 text-slate-500 transition group-hover:text-blue-300"
            />
          </Link>

          <Link
            to="/profile"
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-400/[0.05] md:col-span-2 xl:col-span-1"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <Code2 size={22} />
            </span>

            <span className="min-w-0 flex-1">
              <strong className="block text-sm font-bold text-white">
                Your profile
              </strong>
              <small className="mt-1 block text-xs leading-5 text-slate-400">
                Manage your account
              </small>
            </span>

            <ArrowUpRight
              size={18}
              className="shrink-0 text-slate-500 transition group-hover:text-emerald-300"
            />
          </Link>
        </section>

        {/* Recent conversions heading */}
        <section className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Recent conversions
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Your latest saved code transformations.
            </p>
          </div>

          <Link
            to="/history"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </section>

        {/* Recent conversions panel */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">

          {loading ? (
            <div className="flex min-h-52 flex-col items-center justify-center">
              <RefreshCw
                size={26}
                className="animate-spin text-cyan-400"
              />
              <p className="mt-4 text-sm text-slate-400">
                Loading recent conversions...
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 py-10 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Braces size={25} />
              </div>

              <h3 className="text-lg font-bold text-white">
                No conversions yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                {error ||
                  "Your first conversion is just a few clicks away."}
              </p>

              <Link
                to="/converter"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Create your first conversion
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {items.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="group flex flex-wrap items-center gap-3 p-4 transition hover:bg-white/[0.025] sm:gap-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Code2 size={19} />
                  </div>

                  <div className="min-w-0 flex-1 basis-40">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white">
                      <span>{item.sourceLanguage}</span>
                      <ArrowRight
                        size={14}
                        className="text-cyan-400"
                      />
                      <span>{item.targetLanguage}</span>
                    </div>

                    <p className="mt-1 max-w-xl truncate font-mono text-xs text-slate-500">
                      {item.sourceCode?.slice(0, 100) ||
                        "Code conversion"}
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock3 size={13} />
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      : "Date unavailable"}
                  </span>

                  <Link
                    to="/history"
                    title="View conversion history"
                    aria-label="View conversion history"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tip */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-violet-400/10 bg-violet-400/[0.04] p-4 text-sm leading-6 text-slate-400">
          <Sparkles
            size={17}
            className="mt-1 shrink-0 text-violet-300"
          />
          <p>
            <span className="font-semibold text-violet-300">
              Pro tip:
            </span>{" "}
            Try converting a small function first, then review
            the output carefully before using it in production.
          </p>
        </div>
      </div>
    </main>
  );
}
