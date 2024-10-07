"use client";
import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CustomTable from '@/components/mui/CustomTable';
import { getBooks, createBook, updateBook, deleteBook } from "@/api/bookapi";
import { getAuthors } from "@/api/authorapi";
import { getCategories } from "@/api/categoryapi";
import { getEditorials } from "@/api/editorialapi";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 700,
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function TableBooks() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

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

  const handleOpenModal = (book = null) => {
    setCurrentBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentBook(null);
    setOpenModal(false);
  };

  const handleSaveBook = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookData = Object.fromEntries(formData.entries());

    try {
      if (currentBook) {
        await updateBook({...currentBook, ...bookData});
      } else {
        await createBook(bookData);
      }
      fetchBooks();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const columns = [
    {
      field: "imageUrl",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${params.value}`}
          alt={params.row.title}
          style={{ width: '50px', height: '100%' }}
        />
      ),
    },
    { field: "title", headerName: "Título", width: 200 },
    { 
      field: "author", 
      headerName: "Autor", 
      width: 200,
      valueGetter: (value, row) => row.author?.nameAuthor,
    },
    { 
      field: "category", 
      headerName: "Categoría", 
      width: 150,
      valueGetter: (value, row) => row.category?.nameCategory,
    },
    { 
      field: "editorial", 
      headerName: "Editorial", 
      width: 150,
      valueGetter: (value, row) => row.editorial?.nameEditorial,
    },
    { field: "description", headerName: "Descripción", width: 200 },
    { field: "numberOfPage", headerName: "Número de páginas", width: 150, type: 'number' },
    { field: "language", headerName: "Idioma", width: 100 },
    { field: "isbn", headerName: "ISBN", width: 100 },
    { 
      field: "publicationDate", 
      headerName: "Fecha de publicación", 
      width: 130,
      valueGetter: (value, row) => row.publicationDate ? new Date(row.publicationDate).toLocaleDateString() : null,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpenModal(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteBook(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <CustomTable 
        rows={books} 
        columns={columns}
        loading={isLoading}
        onAdd={() => handleOpenModal()}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="book-modal-title"
      >
        <Box sx={modalStyle} component="form" onSubmit={handleSaveBook}>
          <h2 id="book-modal-title">{currentBook ? 'Editar Libro' : 'Agregar Libro'}</h2>
          <TextField name="title" label="Título" fullWidth margin="normal" defaultValue={currentBook?.title || ''} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="author-label">Autor</InputLabel>
            <Select
              labelId="author-label"
              name="author"
              defaultValue={currentBook?.author?._links?.self?.href || ''}
            >
              {authors.map((author) => (
                <MenuItem key={author._links.self.href} value={author._links.self.href}>
                  {author.nameAuthor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              defaultValue={currentBook?.category?._links?.self?.href || ''}
            >
              {categories.map((category) => (
                <MenuItem key={category._links.self.href} value={category._links.self.href}>
                  {category.nameCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="editorial-label">Editorial</InputLabel>
            <Select
              labelId="editorial-label"
              name="editorial"
              defaultValue={currentBook?.editorial?._links?.self?.href || ''}
            >
              {editorials.map((editorial) => (
                <MenuItem key={editorial._links.self.href} value={editorial._links.self.href}>
                  {editorial.nameEditorial}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField name="description" label="Descripción" fullWidth margin="normal" multiline rows={4} defaultValue={currentBook?.description || ''} />
          <TextField name="numberOfPage" label="Número de páginas" type="number" fullWidth margin="normal" defaultValue={currentBook?.numberOfPage || ''} />
          <TextField name="language" label="Idioma" fullWidth margin="normal" defaultValue={currentBook?.language || ''} />
          <TextField name="isbn" label="ISBN" fullWidth margin="normal" defaultValue={currentBook?.isbn || ''} />
          <TextField name="publicationDate" label="Fecha de publicación" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} defaultValue={currentBook?.publicationDate || ''} />
          <input type="file" name="image" accept="image/*" />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}