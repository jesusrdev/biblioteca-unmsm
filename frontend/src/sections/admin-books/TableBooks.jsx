"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CustomTable from "@/components/mui/CustomTable";
import { getBooks, createBook, updateBook, deleteBook } from "@/api/bookapi";
import { getAuthors } from "@/api/authorapi";
import { getCategories } from "@/api/categoryapi";
import { getEditorials } from "@/api/editorialapi";
import FormModalBooks from "./FormModalBooks";

export default function TableBooks() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
    fetchEditorials();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await getBooks("detailed");
      setBooks(
        response.map((book) => ({ ...book, id: book._links.self.href }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  const handleOpenModal = (book = null) => {
    setCurrentBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentBook(null);
    setOpenModal(false);
  };

  const handleSaveBook = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (currentBook) {
        // Para actualización, incluimos los datos existentes que no están en el formulario
        for (let key in currentBook) {
          if (!formData.has(key) && key !== "id" && key !== "_links") {
            formData.append(key, currentBook[key]);
          }
        }
        await updateBook(currentBook.idBook, formData);
      } else {
        await createBook(formData);
      }
      fetchBooks();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const columns = [
    {
      field: "imageUrl",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${params.value}`}
          alt={params.row.title}
          style={{ width: "50px", height: "100%" }}
        />
      ),
    },
    { field: "title", headerName: "Título", width: 200 },
    {
      field: "author",
      headerName: "Autor",
      width: 200,
      valueGetter: (value, row) => row.author?.nameAuthor,
    },
    {
      field: "category",
      headerName: "Categoría",
      width: 150,
      valueGetter: (value, row) => row.category?.nameCategory,
    },
    {
      field: "editorial",
      headerName: "Editorial",
      width: 150,
      valueGetter: (value, row) => row.editorial?.nameEditorial,
    },
    { field: "description", headerName: "Descripción", width: 200 },
    {
      field: "numberOfPage",
      headerName: "Número de páginas",
      width: 150,
      type: "number",
    },
    { field: "language", headerName: "Idioma", width: 100 },
    { field: "isbn", headerName: "ISBN", width: 100 },
    {
      field: "publicationDate",
      headerName: "Fecha de publicación",
      width: 130,
      valueGetter: (value, row) =>
        row.publicationDate
          ? new Date(row.publicationDate).toLocaleDateString()
          : null,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpenModal(params.row)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <CustomTable
        rows={books}
        columns={columns}
        loading={isLoading}
        onAdd={() => handleOpenModal()}
      />
      <FormModalBooks
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveBook={handleSaveBook}
        currentBook={currentBook}
        authors={authors}
        categories={categories}
        editorials={editorials}
      />
    </Box>
  );
}
