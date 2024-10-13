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

export default function FormModalLoans({
  openModal,
  handleCloseModal,
  handleSaveLoan,
  currentLoan,
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
      aria-labelledby="loan-modal-title"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSaveLoan}>
        <h2 id="loan-modal-title" className="my-0 mb-2 leading-none">
          {currentLoan ? "Editar Préstamo" : "Agregar Préstamo"}
        </h2>
        <FormControl fullWidth margin="normal">
          <InputLabel id="loan-status-label">Estado</InputLabel>
          <Select
            labelId="loan-status-label"
            name="loanStatus"
            defaultValue={currentLoan?.loanStatus || ""}
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="aprobado">Aprobado</MenuItem>
            <MenuItem value="rechazado">Rechazado</MenuItem>
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