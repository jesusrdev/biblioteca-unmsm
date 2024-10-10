import axios from "axios";

export const getCopyBooksByUrl = async (url) => {
  const response = await axios.get(url);
  return response.data._embedded.copyBooks;
}

export const changeStatusCopyBook = async (id, status) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/copyBooks/${id}`,
    {
      status: status,
    }
  );
  return response.data;
}