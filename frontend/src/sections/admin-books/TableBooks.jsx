"use client";
import { getBooks } from "@/api/bookapi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function TableBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks("detailed");
        setBooks(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const columns = [
    {
      field: "imageUrl",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${params.value}`}
          className="h-full m-auto"
        />
      ),
    },
    { field: "title", headerName: "Título", width: 200 },
    {
      field: "author",
      headerName: "Autor",
      width: 200,
      renderCell: (params) => params.value.nameAuthor,
    },
    {
      field: "category",
      headerName: "Categoría",
      width: 150,
      renderCell: (params) => params.value.nameCategory,
    },
    {
      field: "editorial",
      headerName: "Editorial",
      width: 150,
      renderCell: (params) => params.value.nameEditorial,
    },
    { field: "description", headerName: "Descripción", width: 200 },
    { field: "numberOfPage", headerName: "Número de páginas", width: 150 },
    { field: "language", headerName: "Idioma", width: 100 },
    { field: "isbn", headerName: "ISBN", width: 100 },
    {
      field: "publicationDate",
      headerName: "Fecha de publicación",
      width: 100,
    },
  ];
  return (
    <div>
      <DataGrid
        rows={books}
        density="comfortable"
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick={true}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        getRowId={(row) => row._links.self.href}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}
