import axios from "axios";
import { getAxiosConfig } from "./axios-config";

export async function getCategories(projection) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?projection=${projection}`,
    getAxiosConfig()
  );
  return response.data._embedded.categories;
}

export const createCategory = async (category) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    category,
    getAxiosConfig()
  );
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
    category,
    getAxiosConfig()
  );
  return response.data;
}
