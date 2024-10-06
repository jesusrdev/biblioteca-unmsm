import axios from "axios";

export async function getCategories(projection) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?projection=${projection}`
  );
  return response.data._embedded.categories;
}
