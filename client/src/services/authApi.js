import http from "./http";
export const signup = async (payload) => (await http.post("/auth/signup", payload)).data;
export const login = async (payload) => (await http.post("/auth/login", payload)).data;
export const logout = async () => (await http.post("/auth/logout")).data;
export const getMe = async () => (await http.get("/auth/me")).data;
export const updateProfile = async (payload) => (await http.patch("/auth/profile", payload)).data;