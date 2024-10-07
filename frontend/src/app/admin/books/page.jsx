import CustomCard from "@/components/Card";
import TableBooks from "@/sections/admin-books/TableBooks";
import React from "react";

export default function AdminBooksPage() {
  return (
    <main className="w-full p-8">
      <h1 className="text-5xl mt-0 font-bold text-center ">
        Administrar libros
      </h1>
      <CustomCard className="w-full">
        <TableBooks />
      </CustomCard>
    </main>
  );
}
