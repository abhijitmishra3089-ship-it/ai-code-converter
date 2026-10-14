import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../services/authApi";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authApi.getMe().then(data => setUser(data.user || null)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  const login = async (values) => { const data = await authApi.login(values); setUser(data.user); return data; };
  const signup = async (values) => { const data = await authApi.signup(values); setUser(data.user); return data; };
  const logout = async () => { try { await authApi.logout(); } finally { setUser(null); } };
  const updateUser = (nextUser) => setUser(nextUser);
  return <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);