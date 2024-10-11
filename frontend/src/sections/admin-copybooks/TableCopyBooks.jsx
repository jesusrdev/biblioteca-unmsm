"use client";

import { getBooks } from "@/api/bookapi";
import CustomTable from "@/components/mui/CustomTable";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  createCopyBook,
  getCopyBooks,
  updateCopyBook,
} from "@/api/copybookapi";
import FormModalCopyBooks from "./FormModalCopyBooks";

export default function TableCopyBooks() {
  const [copyBooks, setCopyBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentCopyBook, setCurrentCopyBook] = useState(null);

  useEffect(() => {
    fetchCopyBooks();
    fetchBooks();
  }, []);

  const fetchCopyBooks = async () => {
    try {
      const response = await getCopyBooks("detailed");
      setCopyBooks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await getBooks("simple");
      setBooks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (copyBook = null) => {
    setCurrentCopyBook(copyBook);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentCopyBook(null);
    setOpenModal(false);
  };

  const handleSaveCopyBook = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (currentCopyBook) {
        // Para actualización, incluimos los datos existentes que no están en el formulario
        for (let key in currentCopyBook) {
          if (!formData.has(key) && key !== "id" && key !== "_links") {
            formData.append(key, currentCopyBook[key]);
          }
        }
        await updateCopyBook(currentCopyBook.idCopy, formData);
      } else {
        await createCopyBook(formData);
      }
      fetchCopyBooks();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const columns = [
    {
      field: "idCopy",
      headerName: "Id",
      width: 100,
      editable: false,
    },
    {
      field: "title",
      headerName: "Título",
      width: 200,
      valueGetter: (value, row) => row.book.title,
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "conditionBook", headerName: "Condición", width: 250 },
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
        rows={copyBooks}
        columns={columns}
        loading={isLoading}
        onAdd={() => handleOpenModal()}
        getRowId={(row) => row.idCopy}
      />
      <FormModalCopyBooks
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveCopyBook={handleSaveCopyBook}
        currentCopyBook={currentCopyBook}
        books={books}
      />
    </Box>
  );
}
