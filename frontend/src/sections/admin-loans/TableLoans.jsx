"use client";

import { getLoans, updaStateLoan } from "@/api/loanapi";
import CustomTable from "@/components/mui/CustomTable";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FormModalLoans from "./FormModalLoans";

export default function TableLoans() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentLoan, setCurrentLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await getLoans("detailed");
      setLoans(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (loan = null) => {
    setCurrentLoan(loan);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentLoan(null);
    setOpenModal(false);
  };

  const handleSaveLoan = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await updaStateLoan(
        currentLoan.idLoan,
        formData.get("loanStatus")
      );

      fetchLoans();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving loan:", error);
    }
  };

  const columns = [
    {
      field: "idLoan",
      headerName: "Id",
      width: 50,
      editable: false,
    },
    {
      field: "idUser",
      headerName: "Usuario",
      width: 200,
      valueGetter: (value, row) =>
        row.user?.personalInfo?.firstName +
        " " +
        row.user?.personalInfo?.lastName,
    },
    {
      field: "idBook",
      headerName: "Libro",
      width: 200,
      valueGetter: (value, row) => row.copyBook?.book?.title,
    },
    { field: "dateLoan", headerName: "Fecha", width: 150 },
    { field: "returnDate", headerName: "Fecha de devolución", width: 200 },
    { field: "loanStatus", headerName: "Estado", width: 130 },
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
        rows={loans}
        columns={columns}
        loading={isLoading}
        // onAdd={() => handleOpenModal()}
        getRowId={(row) => row._links.self.href}
      />
      <FormModalLoans
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSaveLoan={handleSaveLoan}
        currentLoan={currentLoan}
      />
    </Box>
  );
}
