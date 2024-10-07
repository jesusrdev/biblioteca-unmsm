"use client";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "@/api/categoryapi";
import CustomTable from "@/components/mui/CustomTable";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FormModalCategories from "./FormModalCategories";

export default function TableCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories("simple");
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (category = null) => {
    setCurrentCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentCategory(null);
    setOpenModal(false);
  };

  const handleSaveCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (currentCategory) {
        // Para actualización, incluimos los datos existentes que no están en el formulario
        for (let key in currentCategory) {
          if (!formData.has(key) && key !== "id" && key !== "_links") {
            formData.append(key, currentCategory[key]);
          }
        }
        await updateCategory(currentCategory.idCategory, {
          nameCategory: formData.get("nameCategory"),
        });
      } else {
        await createCategory({
          nameCategory: formData.get("nameCategory"),
        });
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const columns = [
    {
      field: "idCategory",
      headerName: "Id",
      width: 100,
      editable: false,
    },
    {
      field: "nameCategory",
      headerName: "Nombre",
      width: 250,
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
        rows={categories}
        columns={columns}
        loading={isLoading}
        isEditable={false}
        onAdd={() => handleOpenModal()}
        getRowId={(row) => row.idCategory}
      />
      <FormModalCategories
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveCategory={handleSaveCategory}
        currentCategory={currentCategory}
      />
    </Box>
  );
}
