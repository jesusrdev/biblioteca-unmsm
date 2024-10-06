import axios from "axios";

export const getEditorials = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/editorials?projection=${projection}`
  );
  return response.data._embedded.editorials;
};
