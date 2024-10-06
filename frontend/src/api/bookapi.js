import axios from "axios";

export async function getBooks(projection) {
  if (projection) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books?projection=${projection}`
    );
    return response.data._embedded.books;
  }
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books`
  );
  return response.data._embedded.books;
}

export async function getBookByCategory(url) {
  const response = await axios.get(url);
  return response.data._embedded.books;
}
