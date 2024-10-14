import axios from "axios";
import { getAxiosConfig } from "./axios-config";

export const getCopyBooks = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/copyBooks?projection=${projection}`,
    getAxiosConfig()
  );
  return response.data._embedded.copyBooks;
};

export const getCopyBooksByUrl = async (url) => {
  const response = await axios.get(url, getAxiosConfig());
  return response.data._embedded.copyBooks;
}

export const changeStatusCopyBook = async (id, status) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/copyBooks/${id}`,
    {
      status: status,
    },
    getAxiosConfig()
  );
  return response.data;
}

export const createCopyBook = async (formData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/copybooks/create`,
    formData,
    getAxiosConfig()
  );
  return response.data;
}

export const updateCopyBook = async (id, formData) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/copybooks/update/${id}`,
    formData,
    getAxiosConfig()
  );
  return response.data;
}