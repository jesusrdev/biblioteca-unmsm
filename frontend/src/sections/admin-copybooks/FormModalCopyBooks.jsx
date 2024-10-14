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

export default function FormModalCopyBooks({
  openModal,
  handleCloseModal,
  handleSaveCopyBook,
  currentCopyBook,
  books,
  style,
}) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "fit-content",
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
      aria-labelledby="copy-book-modal-title"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSaveCopyBook}>
        <h2 id="copy-book-modal-title" className="my-0 mb-2 leading-none">
          {currentCopyBook ? "Editar ejemplar" : "Agregar ejemplar"}
        </h2>
        <FormControl fullWidth margin="normal">
          <InputLabel id="book-label">Libro</InputLabel>
          <Select
            labelId="book-label"
            name="id_book"
            defaultValue={currentCopyBook?.book?.idBook || ""}
          >
            {books.map((book) => (
              <MenuItem key={book.idBook} value={book.idBook}>
                {book.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="condition-label">Condición</InputLabel>
          <Select
            labelId="condition-label"
            name="conditionBook"
            defaultValue={currentCopyBook?.conditionBook || ""}
          >
            <MenuItem value="En buen estado">En buen estado</MenuItem>
            <MenuItem value="En mal estado">En mal estado</MenuItem>
            <MenuItem value="De segunda mano">De segunda mano</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            defaultValue={currentCopyBook?.status || ""}
          >
            <MenuItem value="disponible">Disponible</MenuItem>
            <MenuItem value="prestado">Prestado</MenuItem>
            <MenuItem value="extraviado">Extraviado</MenuItem>
          </Select>
        </FormControl>
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