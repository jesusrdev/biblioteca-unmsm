import {
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";

export default function LoanBookModal({
  openModal,
  handleCloseModal,
  handleCreateLoan,
  user,
  idCopyBook,
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
      <Box sx={modalStyle} component="form" onSubmit={handleCreateLoan}>
        <h2 id="author-modal-title" className="my-0 mb-2 leading-none">
          Solicitar libro
        </h2>
        <TextField
          name="id_user"
          label="Usuario"
          fullWidth
          margin="normal"
          value={user}
        />
        <TextField
          name="id_copy"
          label="Id del ejemplar"
          fullWidth
          margin="normal"
          value={idCopyBook}
        />
        <TextField
          name="date_loan"
          label="Fecha de inicio"
          type="date"
          fullWidth
          margin="normal"
        />
        <TextField
          name="return_date"
          label="Fecha de devolución"
          type="date"
          fullWidth
          margin="normal"
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