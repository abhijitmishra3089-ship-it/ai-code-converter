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
  UserRound,
  Sparkles,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070914] px-4 py-10 text-white sm:px-6 lg:px-8">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

      {/* Back to home */}
      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      {/* Signup card */}
      <div className="relative z-10 my-12 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1020]/90 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:grid-cols-2">

        {/* LEFT PANEL */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-gradient-to-br from-violet-950/70 via-[#11132a] to-[#071321] p-10 md:flex lg:p-12">

          <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full border border-violet-400/10" />
          <div className="pointer-events-none absolute -right-12 top-36 h-48 w-48 rounded-full border border-violet-400/15" />

          {/* Logo */}
          <Link
            to="/"
            className="relative flex w-fit items-center gap-3"
          >
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
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-lg">
              <Sparkles size={28} />
            </div>

            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-violet-300">
              MAKE ROOM FOR WHAT'S NEXT
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              One account.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Infinite ways to build.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
              Join a workspace designed to help you learn,
              experiment, and turn ideas into working code.
            </p>

            {/* Benefits */}
            <div className="mt-9 space-y-5">
              {[
                "AI-powered code conversions",
                "Your personal conversion history",
                "A workspace that stays yours",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                    <Check size={14} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>

            {/* Mini code preview */}
            <div className="mt-9 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#090c17]/90">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-gray-400">
                    app.js
                  </span>
                </div>

                <span className="text-[10px] font-bold tracking-wider text-cyan-300">
                  JAVASCRIPT
                </span>
              </div>

              <div className="overflow-x-auto p-4 font-mono text-xs leading-7">
                <p>
                  <span className="text-fuchsia-400">const</span>{" "}
                  <span className="text-cyan-300">createFuture</span>{" "}
                  <span className="text-gray-300">= () =&gt; {"{"}</span>
                </p>
                <p className="pl-4">
                  <span className="text-fuchsia-400">return</span>{" "}
                  <span className="text-emerald-300">
                    "Keep building"
                  </span>
                </p>
                <p className="text-gray-300">{"}"}</p>
              </div>
            </div>
          </div>

          {/* Left footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <LockKeyhole size={14} className="text-emerald-400" />
              Secure account creation
            </span>
            <span>Made for builders</span>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <Link
              to="/"
              className="mb-8 flex items-center justify-center gap-2 md:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
                <Code2 size={22} />
              </span>

              <span className="text-xl font-bold">
                CodeMorph{" "}
                <span className="text-violet-400">AI</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-7">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
                <Sparkles size={13} />
                GET STARTED — IT'S FREE
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create your{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  account
                </span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                A better way to move between languages.
              </p>
            </div>

            {/* Signup form */}
            <form onSubmit={submit} className="space-y-4">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-200"
                >
                  Full name
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-violet-400 focus-within:bg-violet-400/[0.04] focus-within:ring-4 focus-within:ring-violet-500/10">
                  <UserRound
                    size={18}
                    className="shrink-0 text-gray-500 transition group-focus-within:text-violet-400"
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Alex Morgan"
                    value={form.name}
                    onChange={change}
                    autoComplete="name"
                    minLength={2}
                    maxLength={60}
                    required
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-gray-200"
                >
                  Password
                  <span className="text-xs font-normal text-gray-500">
                    8+ characters
                  </span>
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-violet-400 focus-within:bg-violet-400/[0.04] focus-within:ring-4 focus-within:ring-violet-500/10">
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-gray-500 transition group-focus-within:text-violet-400"
                  />

                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={change}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="shrink-0 text-gray-500 transition hover:text-violet-300"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-200"
                >
                  Confirm password
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition focus-within:border-violet-400 focus-within:bg-violet-400/[0.04] focus-within:ring-4 focus-within:ring-violet-500/10">
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-gray-500 transition group-focus-within:text-violet-400"
                  />

                  <input
                    id="confirmPassword"
                    type={show ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter password again"
                    value={form.confirmPassword}
                    onChange={change}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm leading-6 text-red-300"
                >
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={busy}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-4 focus:ring-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {busy ? "Creating account..." : "Create account"}

                {!busy && (
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Sign in link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="inline-flex items-center gap-1 font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Sign in
                <ArrowRight size={14} />
              </Link>
            </p>

            {/* Security note */}
            <div className="mt-7 flex items-center justify-center gap-2 text-center text-xs leading-5 text-gray-500">
              <ShieldCheck
                size={15}
                className="shrink-0 text-emerald-400"
              />
              Your account security matters to us.
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-0 right-0 px-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} CodeMorph AI
        <span className="mx-2 text-gray-700">•</span>
        Crafted for the curious.
      </div>
    </main>
  );
}
