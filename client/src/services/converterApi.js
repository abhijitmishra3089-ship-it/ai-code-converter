import http from "./http";
export const convertCode = async (payload) => (await http.post("/conversions", payload)).data;
export const getHistory = async () => (await http.get("/conversions")).data;
export const deleteConversion = async (id) => (await http.delete(`/conversions/${id}`)).data;