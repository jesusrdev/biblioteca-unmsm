import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";

export default function FormModalBooks({
  openModal,
  handleCloseModal,
  handleSaveBook,
  currentBook,
  authors,
  categories,
  editorials,
  style,
}) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 700,
    overflow: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
    ...style,
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="book-modal-title"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSaveBook}>
        <h2 id="book-modal-title">
          {currentBook ? "Editar Libro" : "Agregar Libro"}
        </h2>
        <TextField
          name="title"
          label="Título"
          fullWidth
          margin="normal"
          defaultValue={currentBook?.title || ""}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="author-label">Autor</InputLabel>
          <Select
            labelId="author-label"
            name="authorId"
            defaultValue={currentBook?.author?.idAuthor || ""}
          >
            {authors.map((author) => (
              <MenuItem key={author.idAuthor} value={author.idAuthor}>
                {author.nameAuthor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            defaultValue={currentBook?.category?.idCategory || ""}
          >
            {categories.map((category) => (
              <MenuItem key={category.idCategory} value={category.idCategory}>
                {category.nameCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="editorial-label">Editorial</InputLabel>
          <Select
            labelId="editorial-label"
            name="editorialId"
            defaultValue={currentBook?.editorial?.idEditorial || ""}
          >
            {editorials.map((editorial) => (
              <MenuItem
                key={editorial.idEditorial}
                value={editorial.idEditorial}
              >
                {editorial.nameEditorial}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="description"
          label="Descripción"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          defaultValue={currentBook?.description || ""}
        />
        <TextField
          name="numberOfPage"
          label="Número de páginas"
          type="number"
          fullWidth
          margin="normal"
          defaultValue={currentBook?.numberOfPage || ""}
        />
        <TextField
          name="language"
          label="Idioma"
          fullWidth
          margin="normal"
          defaultValue={currentBook?.language || ""}
        />
        <TextField
          name="isbn"
          label="ISBN"
          fullWidth
          margin="normal"
          defaultValue={currentBook?.isbn || ""}
        />
        <TextField
          name="publicationDate"
          label="Fecha de publicación"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          defaultValue={currentBook?.publicationDate?.split("T")[0] || ""}
        />
        <input type="file" name="imageFile" accept="image/*" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
}
