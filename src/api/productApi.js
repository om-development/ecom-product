import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return { ...data, image: data.thumbnail || data.images?.[0] || "" };
};

export const getProducts = async (limit = 200) => {
  const { data } = await api.get(`/products?limit=${limit}`);
  return data.products.map((p) => ({
    ...p,
    image: p.thumbnail || p.images?.[0] || "",
  }));
};

export const addProduct = async (product) => {
  const { data } = await api.post("/products/add", product);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/products/category-list");
  return data;
};
