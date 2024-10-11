import {
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";

export default function FormModalCategories({
  openModal,
  handleCloseModal,
  handleSaveCategory,
  currentCategory,
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
      aria-labelledby="category-modal-title"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSaveCategory}>
        <h2 id="category-modal-title" className="my-0 mb-2 leading-none">
          {currentCategory ? "Editar Categoría" : "Agregar Categoría"}
        </h2>
        <TextField
          name="nameCategory"
          label="Nombre"
          fullWidth
          margin="normal"
          defaultValue={currentCategory?.nameCategory || ""}
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
