
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Code2, LoaderCircle } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Loading screen while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080c18] px-4 text-white">
        <div className="flex flex-col items-center gap-5">

          {/* Logo */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/20">
            <Code2 size={32} className="text-white" />
          </div>

          {/* Loading spinner */}
          <LoaderCircle
            size={30}
            className="animate-spin text-violet-400"
          />

          <div className="text-center">
            <h2 className="text-lg font-semibold tracking-tight">
              CodeMorph AI
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Verifying your session...
            </p>
          </div>

          {/* Loading indicator */}
          <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" />
          </div>
        </div>
      </div>
    );
  }

  // Redirect unauthenticated users to login
  return user ? children : <Navigate to="/login" replace />;
}