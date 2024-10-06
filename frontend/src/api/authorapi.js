import axios from "axios";

export const getAuthors = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/authors?projection=${projection}`
  );
  return response.data._embedded.authors;
};
