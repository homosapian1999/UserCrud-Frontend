import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Functions
export const getUsers = async () => (await api.get("/")).data;
export const getUserById = async (id: string) => (await api.get(`/${id}`)).data;
export const createUser = async (userData: any) =>
  (await api.post("/", userData)).data;
export const updateUser = async (id: string, userData: any) =>
  (await api.put(`/${id}`, userData)).data;
export const deleteUser = async (id: string) =>
  (await api.delete(`/${id}`)).data;
