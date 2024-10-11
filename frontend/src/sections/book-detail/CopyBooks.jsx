"use client";
import { useState } from "react";
import CustomCard from "@/components/Card";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LoanBookModal from "./LoanBookModal";
import { createLoan } from "@/api/loanapi";
import { changeStatusCopyBook } from "@/api/copybookapi";

export default function CopyBooks({ copyBooks, fetchCopyBooks }) {
  const [openModal, setOpenModal] = useState(false);
  const [idCopyBook, setIdCopyBook] = useState(null);
  const user = 1;

  const handleOpenModal = (idCopyBook = null) => {
    setIdCopyBook(idCopyBook);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateLoan = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      for (let key in formData) {
        if (
          key !== "id_user" &&
          key !== "id_copy" &&
          key !== "date_loan" &&
          key !== "return_date"
        ) {
          formData.append(key, formData.get(key));
        }
      }

      formData.append("id_copy", idCopyBook);
      formData.append("id_user", user);
      formData.append("loan_status", "pendiente");

      const response = await createLoan(formData);

      const copyBook = await changeStatusCopyBook(idCopyBook, "prestado");

      fetchCopyBooks();

      handleCloseModal();
    } catch (error) {
      console.error("Error saving loan:", error);
    }
  };

  const columns = [
    { field: "title", headerName: "Nombre del Libro", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "conditionBook", headerName: "Condición", width: 250 },
    {
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === "disponible") {
          return (
            <Button
              variant="text"
              color="primary"
              className="capitalize"
              onClick={() =>
                handleOpenModal(
                  // Obtener el ultimo id de la url
                  params.row._links.self.href.split("/").pop()
                )
              }
            >
              Solicitar libro
            </Button>
          );
        } else {
          return (
            <Button
              variant="text"
              color="primary"
              className="capitalize"
              disabled
            >
              Solicitar libro
            </Button>
          );
        }
      },
    },
  ];

  return (
    <CustomCard className="w-full col-span-full px-5 py-5">
      <DataGrid
        rows={copyBooks}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        getRowId={(row) => row._links.self.href}
        sx={{
          "& .MuiDataGrid-toolbarContainer": {
            padding: "8px",
            backgroundColor: "#F8FAFC",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
          "& .MuiInputBase-root": {
            borderRadius: "20px",
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiTablePagination-root": {
            color: "#666",
          },
        }}
      />
      <LoanBookModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleCreateLoan={handleCreateLoan}
        user={user}
        idCopyBook={idCopyBook}
      />
    </CustomCard>
  );
}
