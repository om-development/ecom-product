import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const loginUser = async (username, password) => {
  const { data } = await api.post("/auth/login", { username, password });
  return data;
};

export const getUsers = async (limit = 10) => {
  const { data } = await api.get(`/users?limit=${limit}`);
  return data.users;
};

export const getUser = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
