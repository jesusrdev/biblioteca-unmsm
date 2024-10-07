import axios from "axios";

export const getEditorials = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/editorials?projection=${projection}`
  );
  return response.data._embedded.editorials;
};

export const createEditorial = async (editorial) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/editorials`,
    editorial
  );
  return response.data;
};

export const updateEditorial = async (id, editorial) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/editorials/${id}`,
    editorial
  );
  return response.data;
};
