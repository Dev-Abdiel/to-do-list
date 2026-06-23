import axios from "axios";

const api = axios.create({
  baseURL: "/tasks",
});

export const getTasks = () => api.get("/");

export const createTask = (data) => api.post("/", data);

export const updateTask = (id, data) => api.put(`/${id}`, data);

export const deleteTask = (id) => api.delete(`/${id}`);