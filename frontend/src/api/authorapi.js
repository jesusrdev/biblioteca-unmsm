import axios from "axios";

export const getAuthors = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/authors?projection=${projection}`
  );
  return response.data._embedded.authors;
};

export const createAuthor = async (author) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/authors`,
    author
  );
  return response.data;
};

export const updateAuthor = async (id, author) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/authors/${id}`,
    author
  );
  return response.data;
}
