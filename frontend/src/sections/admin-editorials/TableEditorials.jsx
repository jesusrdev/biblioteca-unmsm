"use client";
import {
  createEditorial,
  getEditorials,
  updateEditorial,
} from "@/api/editorialapi";
import CustomTable from "@/components/mui/CustomTable";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FormModalEditorials from "./FormModalEditorials";

export default function TableEditorials() {
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentEditorial, setCurrentEditorial] = useState(null);

  useEffect(() => {
    fetchEditorials();
  }, []);

  const fetchEditorials = async () => {
    try {
      const response = await getEditorials("simple");
      setEditorials(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (editorial = null) => {
    setCurrentEditorial(editorial);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentEditorial(null);
    setOpenModal(false);
  };

  const handleSaveEditorial = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (currentEditorial) {
        // Para actualización, incluimos los datos existentes que no están en el formulario
        for (let key in currentEditorial) {
          if (!formData.has(key) && key !== "id" && key !== "_links") {
            formData.append(key, currentEditorial[key]);
          }
        }
        await updateEditorial(currentEditorial.idEditorial, {
          nameEditorial: formData.get("nameEditorial"),
        });
      } else {
        await createEditorial({
          nameEditorial: formData.get("nameEditorial"),
        });
      }
      fetchEditorials();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const columns = [
    {
      field: "idEditorial",
      headerName: "Id",
      width: 100,
      editable: false,
    },
    { field: "nameEditorial", headerName: "Nombre", width: 200 },
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
        rows={editorials}
        columns={columns}
        loading={isLoading}
        onAdd={() => handleOpenModal()}
        getRowId={(row) => row.idEditorial}
      />
      <FormModalEditorials
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveEditorial={handleSaveEditorial}
        currentEditorial={currentEditorial}
      />
    </Box>
  );
}