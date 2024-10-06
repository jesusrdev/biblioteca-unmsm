import axios from "axios";

export const getEditorials = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/editorials`);
  return response.data._embedded.editorials;
};