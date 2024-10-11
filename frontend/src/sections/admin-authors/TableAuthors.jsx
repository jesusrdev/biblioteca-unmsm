"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CustomTable from "@/components/mui/CustomTable";
import { getAuthors, createAuthor, updateAuthor } from "@/api/authorapi";
import FormModalAuthors from "./FormModalAuthors";

export default function TableAuthors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      const response = await getAuthors("simple");
      setAuthors(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (author = null) => {
    setCurrentAuthor(author);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentAuthor(null);
    setOpenModal(false);
  };

  const handleSaveAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (currentAuthor) {
        // Para actualización, incluimos los datos existentes que no están en el formulario
        for (let key in currentAuthor) {
          if (!formData.has(key) && key !== "id" && key !== "_links") {
            formData.append(key, currentAuthor[key]);
          }
        }
        await updateAuthor(currentAuthor.idAuthor, {
          nameAuthor: formData.get("nameAuthor"),
        });
      } else {
        await createAuthor({ nameAuthor: formData.get("nameAuthor") });
      }
      fetchAuthors();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving author:", error);
    }
  };

  const columns = [
    {
      field: "idAuthor",
      headerName: "Id",
      width: 100,
      editable: false,
    },
    { field: "nameAuthor", headerName: "Nombre", width: 200 },
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
        rows={authors}
        columns={columns}
        loading={isLoading}
        onAdd={() => handleOpenModal()}
        getRowId={(row) => row.idAuthor}
      />
      <FormModalAuthors
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveAuthor={handleSaveAuthor}
        currentAuthor={currentAuthor}
      />
    </Box>
  );
}
