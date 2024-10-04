"use client";
import { useEffect, useState } from "react";
import CarouselBooks from "./CarouselBooks";
import { Button } from "@mui/material";
import { getCategories } from "@/api/categoryapi";

export default function Categories() {
  const [categoriesBooks, setCategoriesBooks] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategoriesBooks(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categoriesBooks.map((category, index) => (
        <CarouselBooks
          key={index}
          text={category.nameCategory}
          urlGet={category._links.books.href}
          button={<Button variant="contained">Ver más</Button>}
        />
      ))}
    </>
  );
}
