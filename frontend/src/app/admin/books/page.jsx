import CustomCard from "@/components/Card";
import TableBooks from "@/sections/admin-books/TableBooks";
import { Button } from "@mui/material";
import React from "react";

export default function AdminBooksPage() {
  return (
    <main className="w-full sm:w-[calc(100%-240px)] p-8">
      <h1 className="my-20 text-5xl font-bold text-center">
        Administrar libros
      </h1>
      <CustomCard className="w-full">
        <div className="mb-5">
          <Button variant="contained">Crear nuevo libro</Button>
        </div>
        <TableBooks />
      </CustomCard>
    </main>
  );
}
