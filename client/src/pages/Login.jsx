import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Check your details and try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070914] px-4 py-8 text-white sm:px-6 lg:px-8">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

      {/* Back button */}
      <Link
        to="/"
        className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      {/* Main card */}
      <div className="relative z-10 my-14 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1020]/90 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:min-h-[680px] lg:grid-cols-2">

        {/* Left side */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-gradient-to-br from-violet-950/70 via-[#11132a] to-[#071321] p-10 md:flex lg:p-12">

          <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full border border-violet-400/10" />
          <div className="pointer-events-none absolute -right-12 top-36 h-48 w-48 rounded-full border border-violet-400/15" />

          {/* Brand */}
          <Link to="/" className="relative flex w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-600/30">
              <Code2 size={24} />
            </span>

            <span className="text-2xl font-bold tracking-tight">
              CodeMorph
              <span className="ml-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </Link>

          {/* Hero content */}
          <div className="relative my-10">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/40">
              <Sparkles size={28} />
            </div>

            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-violet-300">
              YOUR WORKSPACE AWAITS
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              Pick up where
              <br />
              your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                ideas begin.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
              Your code, your conversions, your flow — all in one focused
              workspace. Transform code between programming languages with
              the power of AI.
            </p>

            {/* Code preview */}
            <div className="mt-9 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#090c17]/90 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-sm text-gray-400">
                    hello-world.py
                  </span>
                </div>

                <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-[10px] font-bold tracking-wider text-cyan-300">
                  PYTHON
                </span>
              </div>

              <div className="overflow-x-auto p-5 font-mono text-sm leading-8">
                <p>
                  <span className="text-fuchsia-400">def</span>{" "}
                  <span className="text-cyan-300">build_ideas</span>
                  <span className="text-gray-300">():</span>
                </p>
                <p className="pl-6">
                  <span className="text-violet-300">return</span>{" "}
                  <span className="text-emerald-300">
                    "something great"
                  </span>
                </p>
                <p className="mt-3 text-gray-600">
                  # Turn ideas into code ✨
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <LockKeyhole size={14} className="text-emerald-400" />
              Your workspace is private
            </span>
            <span>Built for developers</span>
          </div>
        </section>

        {/* Right side: login form */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-10 flex items-center justify-center gap-2 md:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
                <Code2 size={22} />
              </span>
              <span className="text-xl font-bold">
                CodeMorph{" "}
                <span className="text-violet-400">AI</span>
              </span>
            </Link>

            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
                <Sparkles size={13} />
                WELCOME BACK
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to your
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  account
                </span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Good to see you again. Let's get building.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-200"
                >
                  Email address
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-violet-400 focus-within:bg-violet-400/[0.04] focus-within:ring-4 focus-within:ring-violet-500/10">
                  <Mail
                    size={18}
                    className="shrink-0 text-gray-500 transition group-focus-within:text-violet-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={change}
                    autoComplete="email"
                    required
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-200"
                  >
                    Password
                  </label>

                  <Link
                    to="/signup"
                    className="text-xs font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    New here?
                  </Link>
                </div>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-violet-400 focus-within:bg-violet-400/[0.04] focus-within:ring-4 focus-within:ring-violet-500/10">
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-gray-500 transition group-focus-within:text-violet-400"
                  />

                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={change}
                    autoComplete="current-password"
                    required
                    minLength={8}
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    aria-label={
                      show ? "Hide password" : "Show password"
                    }
                    className="shrink-0 text-gray-500 transition hover:text-violet-300"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm leading-6 text-red-300"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={busy}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-4 focus:ring-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {busy ? "Signing you in..." : "Sign in"}

                {!busy && (
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-500">
                YOUR NEXT IDEA IS WAITING
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Create one free
                <ArrowRight size={14} />
              </Link>
            </p>

            {/* Privacy */}
            <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs leading-5 text-gray-500">
              <ShieldCheck
                size={15}
                className="shrink-0 text-emerald-400"
              />
              By continuing, you agree to use CodeMorph responsibly.
            </div>
          </div>
        </section>
      </div>

      {/* Page footer */}
      <div className="absolute bottom-3 left-0 right-0 px-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} CodeMorph AI
        <span className="mx-2 text-gray-700">•</span>
        Crafted for the curious.
      </div>
    </main>
  );
}
