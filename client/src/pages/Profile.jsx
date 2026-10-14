import { useState } from "react";
import {
  Check,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
  Sparkles,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authApi";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    setBusy(true);

    try {
      const d = await updateProfile({ name: trimmedName });

      updateUser(d.user);
      setName(d.user?.name || trimmedName);
      setSuccess("Your profile has been updated.");
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Could not update profile. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  const initial = user?.name?.trim()?.[0]?.toUpperCase() || "U";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070914] px-4 py-8 text-white sm:px-6 lg:px-10">

      {/* Background glow */}
      <div className="pointer-events-none fixed -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-violet-300">
              <Sparkles size={15} />
              YOUR ACCOUNT
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Profile{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                settings
              </span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
              Keep your account details up to date.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2.5 text-sm font-medium text-emerald-300">
            <ShieldCheck size={17} />
            Account protected
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.4fr]">

          {/* Profile card */}
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1020]/90 shadow-2xl shadow-black/20 backdrop-blur-xl">

            {/* Cover */}
            <div className="relative h-36 overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-700 to-cyan-700">
              <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full border border-white/15" />
              <div className="absolute -right-2 -top-12 h-44 w-44 rounded-full border border-white/15" />
              <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

              <div className="absolute left-5 top-5 flex items-center gap-2 text-sm font-semibold text-white/90">
                <Code2 size={19} />
                CodeMorph AI
              </div>

              <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                Developer workspace
              </div>
            </div>

            {/* User details */}
            <div className="px-6 pb-6 sm:px-8">
              <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#0d1020] bg-gradient-to-br from-violet-500 to-indigo-600 text-4xl font-bold shadow-xl shadow-violet-950/40">
                {initial}
              </div>

              <div className="mt-5">
                <h2 className="break-words text-2xl font-bold">
                  {user?.name || "Your name"}
                </h2>

                <p className="mt-2 break-all text-sm text-gray-400">
                  {user?.email || "No email available"}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-2 text-xs font-medium text-violet-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  CodeMorph member
                </div>
              </div>

              <div className="my-7 h-px bg-white/10" />

              {/* Account stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Sparkles size={18} />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    AI workspace
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Current plan</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-sm font-semibold text-white">Active</p>
                  <p className="mt-1 text-xs text-gray-500">Account status</p>
                </div>
              </div>

              {/* Privacy note */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Your privacy matters
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Keep your account information accurate and secure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Settings card */}
          <section className="h-fit rounded-3xl border border-white/10 bg-[#0d1020]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

            {/* Settings heading */}
            <div className="flex items-start gap-4 border-b border-white/10 pb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <UserRound size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Personal information
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Update the details linked to your account.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="mt-7 space-y-6">

              {/* Name field */}
              <div>
                <label
                  htmlFor="profile-name"
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
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={60}
                    required
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  This name will be displayed on your account.
                </p>
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-medium text-gray-200"
                >
                  Email address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 opacity-80">
                  <Mail size={18} className="shrink-0 text-gray-500" />

                  <input
                    id="profile-email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    aria-describedby="email-note"
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-gray-400 outline-none"
                  />

                  <span className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.06] px-2 py-1.5 text-xs text-emerald-300 sm:inline-flex">
                    <ShieldCheck size={13} />
                    Account email
                  </span>
                </div>

                <p
                  id="email-note"
                  className="mt-2 text-xs leading-5 text-gray-500"
                >
                  Email changes are disabled in this implementation.
                </p>
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

              {/* Success message */}
              {success && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-sm leading-6 text-emerald-300"
                >
                  <Check size={18} className="mt-0.5 shrink-0" />
                  {success}
                </div>
              )}

              {/* Bottom actions */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs leading-5 text-gray-500">
                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-emerald-400"
                  />
                  Your account details are private.
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <Save size={16} />
                  {busy ? "Saving..." : "Save changes"}
                  {!busy && (
                    <ArrowUpRight
                      size={16}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Page footer */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] py-5 text-xs text-gray-600 sm:flex-row">
          <span>
            © {new Date().getFullYear()} CodeMorph AI
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={14} />
            Crafted for the curious.
          </span>
        </footer>
      </div>
    </main>
  );
}
