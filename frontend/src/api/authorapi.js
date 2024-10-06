import axios from "axios";

export const getAuthors = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`);
  return response.data._embedded.authors;
};