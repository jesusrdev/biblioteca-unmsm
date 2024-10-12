import {
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";

export default function FormModalEditorials({
  openModal,
  handleCloseModal,
  handleSaveEditorial,
  currentEditorial,
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
      aria-labelledby="editorial-modal-title"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSaveEditorial}>
        <h2 id="editorial-modal-title" className="my-0 mb-2 leading-none">
          {currentEditorial ? "Editar Editorial" : "Agregar Editorial"}
        </h2>
        <TextField
          name="nameEditorial"
          label="Nombre"
          fullWidth
          margin="normal"
          defaultValue={currentEditorial?.nameEditorial || ""}
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