"use client";

import { getAuthors } from "@/api/authorapi";
import { getBookByFilter, getBooks } from "@/api/bookapi";
import { getCategories } from "@/api/categoryapi";
import { getEditorials } from "@/api/editorialapi";
import CustomCard from "@/components/Card";
import { useState, useEffect } from "react";
import FilterOptions from "./FilterOptions";
import BooksContainer from "./BooksContainer";
import { flushSync } from "react-dom";

export default function FilterBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    category: "",
    editorial: "",
    author: "",
  });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchEditorials();
    fetchAuthors();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks("detailed");
      setBooks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooksByFilter = async (options) => {
    try {
      const response = await getBookByFilter(
        options.category,
        options.editorial,
        options.author
      );
      setBooks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories("simple");
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchEditorials = async () => {
    try {
      const response = await getEditorials("simple");
      setEditorials(response);
    } catch (error) {
      console.error("Error fetching editorials:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors("simple");
      setAuthors(response);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleChange = (event) => {
    const options = {
      ...filterOptions,
      [event.target.name]: event.target.value,
    };
    setFilterOptions(options);
    fetchBooksByFilter(options);
  };

  return (
    <div className="">
      <CustomCard className="w-full mb-8">
        <FilterOptions
          categories={categories}
          editorials={editorials}
          authors={authors}
          filterOptions={filterOptions}
          handleChange={handleChange}
        />
      </CustomCard>
      <CustomCard className="w-full">
        <BooksContainer books={books} />
      </CustomCard>
    </div>
  );
}
