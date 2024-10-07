
import {
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";

export default function FormModalAuthors({
  openModal,
  handleCloseModal,
  handleSaveAuthor,
  currentAuthor,
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
      aria-labelledby="author-modal-title"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSaveAuthor}>
        <h2 id="author-modal-title" className="my-0 mb-2 leading-none">
          {currentAuthor ? "Editar Autor" : "Agregar Autor"}
        </h2>
        <TextField
          name="nameAuthor"
          label="Nombre"
          fullWidth
          margin="normal"
          defaultValue={currentAuthor?.nameAuthor || ""}
        />
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