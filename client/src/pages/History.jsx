import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  Code2,
  Clock3,
  Search,
  Trash2,
  History as HistoryIcon,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  deleteConversion,
  getHistory,
} from "../services/converterApi";

export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        setError("");

        const data = await getHistory();

        if (!cancelled) {
          setItems(data.conversions || []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message ||
              "Could not load history."
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

  const remove = async (id) => {
    try {
      setError("");
      setDeletingId(id);

      await deleteConversion(id);

      setItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Could not delete conversion."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter((item) =>
    `${item.sourceLanguage || ""} ${
      item.targetLanguage || ""
    } ${item.sourceCode || ""}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-8 text-slate-100 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Your workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Conversion{" "}
              <span className="text-cyan-400">History</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Every saved transformation, ready when you
              are. Search, review, and manage your previous
              code conversions.
            </p>
          </div>

          <Link
            to="/converter"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 active:scale-[0.98] sm:w-auto"
          >
            <ArrowLeftRight size={18} />
            New conversion
          </Link>
        </header>

        {/* Search toolbar */}
        <section className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                placeholder="Search languages or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0b1020] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-start">
              <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-300">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? "conversion"
                  : "conversions"}
              </span>

              <button
                type="button"
                onClick={() => setSearch("")}
                disabled={!search}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
          >
            <span className="font-bold">!</span>
            <p className="flex-1">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-300 hover:text-white"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* History list */}
        <section className="space-y-4">

          {loading ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <RefreshCw
                size={30}
                className="animate-spin text-cyan-400"
              />
              <p className="mt-4 text-sm text-slate-400">
                Loading your conversion history...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                <HistoryIcon size={30} />
              </div>

              <h2 className="text-xl font-bold text-white">
                {search
                  ? "No matching conversions"
                  : "Your history starts here"}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                {search
                  ? "Try another search term or clear your search."
                  : "Your saved code conversions will appear here once you convert your first snippet."}
              </p>

              {!search && (
                <Link
                  to="/converter"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Convert your first snippet
                  <ArrowRight size={17} />
                </Link>
              )}
            </div>
          ) : (
            filtered.map((item) => (
              <article
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1220] transition duration-300 hover:border-cyan-400/30 hover:bg-[#101729]"
              >
                {/* Card header */}
                <div className="flex items-start gap-3 p-4 sm:items-center sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                    <Code2 size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white sm:text-base">
                      <span>{item.sourceLanguage}</span>
                      <ArrowRight
                        size={15}
                        className="text-cyan-400"
                      />
                      <span>{item.targetLanguage}</span>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 size={13} />
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <button
                    type="button"
                    title="Delete conversion"
                    aria-label="Delete conversion"
                    disabled={deletingId === item._id}
                    onClick={() => remove(item._id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400 disabled:cursor-wait disabled:opacity-50"
                  >
                    {deletingId === item._id ? (
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                {/* Source code preview */}
                <div className="mx-4 overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b14] sm:mx-5">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>

                    <span className="text-xs text-slate-500">
                      Source code
                    </span>
                  </div>

                  <pre className="max-h-56 overflow-auto p-4 font-mono text-xs leading-6 text-slate-300 sm:text-sm">
                    <code>
                      {item.sourceCode || "// No source code"}
                    </code>
                  </pre>
                </div>

                {/* Card footer */}
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300">
                      {item.sourceLanguage}
                    </span>

                    <ArrowRight
                      size={14}
                      className="text-cyan-400"
                    />

                    <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
                      {item.targetLanguage}
                    </span>
                  </div>

                  <Link
                    to="/converter"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                  >
                    Open converter
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Bottom information */}
        {!loading && items.length > 0 && (
          <p className="mt-6 text-center text-xs text-slate-600">
            Showing {filtered.length} of {items.length} saved
            conversions
          </p>
        )}
      </div>
    </main>
  );
}
