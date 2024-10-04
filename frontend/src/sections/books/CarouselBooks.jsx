"use client";
import { getBookByCategory } from "@/api/bookapi";
import CustomCard from "@/components/Card";
import CarouselComponent from "@/components/Carousel";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function CarouselBooks({ text, button, urlGet, ...props }) {
  const [books, setBooks] = useState([]);
  // Get the books from the API filtered by the category
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBookByCategory(urlGet);
        setBooks(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  if (books.length === 0) {
    return null;
  }

  return (
    <CustomCard className="px-0 pb-0 my-10" {...props}>
      <Box className="flex justify-between items-center px-8 mb-4">
        <p className="my-0 text-lg font-semibold font-montserrat">{text}:</p>
        {button}
      </Box>
      <CarouselComponent books={books} />
    </CustomCard>
  );
}
