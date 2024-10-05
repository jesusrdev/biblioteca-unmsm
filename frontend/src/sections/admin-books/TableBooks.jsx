"use client";
import { getBooks, createBook, updateBook, deleteBook } from "@/api/bookapi";
import { getAuthors } from "@/api/authorapi";
import { getCategories } from "@/api/categoryapi";
import { getEditorials } from "@/api/editorialapi";
import CustomTable from "@/components/mui/CustomTable";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

export default function TableBooks() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
    fetchEditorials();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await getBooks("detailed");
      setBooks(response.map(book => ({...book, id: book._links.self.href})));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchEditorials = async () => {
    try {
      const response = await getEditorials();
      setEditorials(response);
    } catch (error) {
      console.error("Error fetching editorials:", error);
    }
  };

  const handleCreateBook = async (newBook) => {
    try {
      const createdBook = await createBook(newBook);
      setBooks(oldBooks => [...oldBooks, {...createdBook, id: createdBook._links.self.href}]);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      await updateBook(updatedBook);
      setBooks(oldBooks => oldBooks.map(book => 
        book.id === updatedBook.id ? {...updatedBook} : book
      ));
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(oldBooks => oldBooks.filter(book => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleImageUpload = async (event, id) => {
    const file = event.target.files[0];
    if (file) {
      // Here you would typically upload the file to your server and get a URL back
      // For this example, we'll just use a placeholder URL
      const imageUrl = URL.createObjectURL(file);
      setBooks(oldBooks => oldBooks.map(book => 
        book.id === id ? {...book, imageUrl} : book
      ));
      // You should also update the book on the server with the new image URL
      // await updateBook({id, imageUrl});
    }
  };

  const columns = [
    {
      field: "imageUrl",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => (
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${params.value}`}
            className="w-12 h-full m-auto"
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id={`image-upload-${params.id}`}
            onChange={(e) => handleImageUpload(e, params.id)}
          />
          <label htmlFor={`image-upload-${params.id}`}>
            <Button component="span">Cambiar</Button>
          </label>
        </div>
      ),
    },
    { field: "title", headerName: "Título", width: 200, editable: true },
    {
      field: "author",
      headerName: "Autor",
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: authors.map(author => ({ value: author._links.self.href, label: author.nameAuthor })),
      valueGetter: (value, row) => row.author?._links?.self?.href,
      valueSetter: (value, row) => {
        const author = authors.find(a => a._links.self.href === value);
        return { ...row, author: author || {} };
      },
    },
    {
      field: "category",
      headerName: "Categoría",
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: categories.map(category => ({ value: category._links.self.href, label: category.nameCategory })),
      valueGetter: (value, row) => row.category?._links?.self?.href,
      valueSetter: (params) => {
        const category = categories.find(c => c._links.self.href === params.value);
        return { ...params.row, category: category || {} };
      },
    },
    {
      field: "editorial",
      headerName: "Editorial",
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: editorials.map(editorial => ({ value: editorial._links.self.href, label: editorial.nameEditorial })),
      valueGetter: (value, row) => row.editorial?._links?.self?.href,
      valueSetter: (params) => {
        const editorial = editorials.find(e => e._links.self.href === params.value);
        return { ...params.row, editorial: editorial || {} };
      },
    },
    { field: "description", headerName: "Descripción", width: 200, editable: true },
    { field: "numberOfPage", headerName: "Número de páginas", width: 150, editable: true, type: 'number' },
    { field: "language", headerName: "Idioma", width: 100, editable: true },
    { field: "isbn", headerName: "ISBN", width: 100, editable: true },
    {
      field: "publicationDate",
      headerName: "Fecha de publicación",
      width: 130,
      editable: true,
      type: 'date',
      valueGetter: (value, row) => {
        // Convert the string date to a Date object
        return value ? new Date(value) : null;
      },
      valueSetter: (value, row) => {
        // Convert the Date object back to a string when saving
        return { ...row, publicationDate: value.toISOString().split('T')[0] };
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <CustomTable 
        rows={books} 
        columns={columns}
        loading={isLoading}
        onRowAdd={handleCreateBook}
        onRowUpdate={handleUpdateBook}
        onRowDelete={handleDeleteBook}
      />
    </Box>
  );
}