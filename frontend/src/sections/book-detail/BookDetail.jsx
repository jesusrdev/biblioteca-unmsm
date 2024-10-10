"use client";

import { getBookById } from "@/api/bookapi";
import CustomCard from "@/components/Card";
import { useEffect, useState } from "react";
import CustomCardMedia from "../book/CustomCardMedia";
import BookInfo from "./BookInfo";
import { getCopyBooksByUrl } from "@/api/copybookapi";
import CopyBooks from "./CopyBooks";

export default function BookDetail({ id }) {
  const [book, setBook] = useState(null);
  const [copyBooks, setCopyBooks] = useState([]);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await getBookById(id, "detailed");
      setBook(response);
      fetchCopyBooks(response._links.copyBooks.href);
    } catch (error) {
      console.error(error);
      setBook(0);
    }
  };

  const fetchCopyBooks = async (url) => {
    try {
      const response = await getCopyBooksByUrl(url);
      setCopyBooks(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (book === 0) {
    return (
      <CustomCard className="w-full px-5 py-5 mt-5">
        No se encontró el libro.
      </CustomCard>
    );
  }

  if (!book) {
    return (
      <CustomCard className="w-full px-5 py-5 mt-5">Loading...</CustomCard>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
      <CustomCard className="w-full px-5 py-5">
        <CustomCardMedia
          image={`${process.env.NEXT_PUBLIC_API_URL}${book?.imageUrl}`}
          className={"aspect-[9/16] h-full max-h-80 rounded-xl"}
        />
      </CustomCard>
      <BookInfo book={book} />
      <CopyBooks
        copyBooks={copyBooks.map((copyBook) => ({
          ...copyBook,
          title: book?.title,
        }))}
        fetchCopyBooks={() => {
          fetchCopyBooks(book._links.copyBooks.href);
        } }
      />
    </div>
  );
}
