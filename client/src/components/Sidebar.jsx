import {
  Code2,
  LayoutDashboard,
  ArrowLeftRight,
  History,
  UserRound,
  Sparkles,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  {
    to: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/converter",
    label: "Code converter",
    icon: ArrowLeftRight,
  },
  {
    to: "/history",
    label: "Conversion history",
    icon: History,
  },
  {
    to: "/profile",
    label: "My profile",
    icon: UserRound,
  },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-[#0b1020] px-4 py-5 text-slate-300">

      {/* Brand */}
      <NavLink
        to="/"
        className="mb-10 flex items-center gap-2 px-2 text-xl font-bold tracking-tight text-white"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
          <Code2 size={23} className="text-white" />
        </span>

        <span>
          CodeMorph
          <span className="ml-1.5 text-violet-400">AI</span>
        </span>
      </NavLink>

      {/* Section heading */}
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Workspace
      </p>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/20"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={19}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-slate-500 group-hover:text-violet-300"
                  }`}
                />

                <span>{label}</span>

                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-4 pt-6">

        {/* AI upgrade card */}
        <div className="overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-slate-900 p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/15 text-violet-300">
            <Sparkles size={18} />
          </div>

          <h3 className="text-sm font-semibold text-white">
            Your ideas, upgraded.
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Turn code into clarity with AI assistance.
          </p>

          <NavLink
            to="/converter"
            className="mt-4 flex items-center justify-between rounded-lg bg-violet-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500"
          >
            Open converter
            <ArrowLeftRight size={15} />
          </NavLink>
        </div>

        {/* User profile */}
        <div className="flex min-w-0 items-center gap-3 border-t border-slate-800 pt-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Developer"}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email || "Welcome back"}
            </p>
          </div>

          <button
            type="button"
            onClick={signout}
            title="Sign out"
            aria-label="Sign out"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}