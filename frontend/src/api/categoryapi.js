import axios from "axios";

export async function getCategories() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response.data._embedded.categories;
}
