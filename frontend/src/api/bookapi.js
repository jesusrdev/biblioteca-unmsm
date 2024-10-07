import axios from "axios";

export const getBooks = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books?projection=${projection}`
  );
  return response.data._embedded.books;
};

export const getBookByFilter = async (
  idCategory,
  idEditorial,
  idAuthor,
  page,
  size
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/books/search?idCategory=${idCategory}&idEditorial=${idEditorial}&idAuthor=${idAuthor}&page=${page}&size=${size}`
  );
  return response.data;
};

export async function getBookByCategory(url) {
  const response = await axios.get(url);
  return response.data._embedded.books;
}

export const createBook = async (book) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/books/create`,
    book
  );
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/books/update/${id}`,
    book
  );
  return response.data;
};
