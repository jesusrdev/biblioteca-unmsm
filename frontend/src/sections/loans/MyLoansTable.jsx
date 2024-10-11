"use client";

import { getMyLoans } from "@/api/loanapi";
import CustomTable from "@/components/mui/CustomTable";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function MyLoansTable() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const idUser = 1;

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await getMyLoans(idUser, "detailed");
      setLoans(response);
    } catch (error) {
      console.error(error);
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
      field: "idBook",
      headerName: "Libro",
      width: 200,
      valueGetter: (value, row) => row.copyBook?.book?.title,
    },
    { field: "dateLoan", headerName: "Fecha", width: 150 },
    { field: "returnDate", headerName: "Fecha de devolución", width: 200 },
    { field: "loanStatus", headerName: "Estado", width: 130 },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <CustomTable
        rows={loans}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row._links.self.href}
      />
    </Box>
  );
}