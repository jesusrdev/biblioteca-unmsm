import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function CustomToolbar({ onAdd }) {
  return (
    <GridToolbarContainer>
      {onAdd && (
        <Button color="primary" startIcon={<AddIcon />} onClick={onAdd}>
          Agregar
        </Button>
      )}
      <GridToolbar />
    </GridToolbarContainer>
  );
}

export default function CustomTable({ 
  rows, 
  columns, 
  loading, 
  onAdd,
  isEditable = false,
  onRowUpdate,
  onRowDelete,
  ...props 
}) {
  const processRowUpdate = isEditable ? async (newRow) => {
    await onRowUpdate(newRow);
    return newRow;
  } : undefined;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      density="comfortable"
      slots={{
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: { onAdd },
      }}
      processRowUpdate={processRowUpdate}
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        pagination: { paginationModel: { pageSize: 10, page: 0 } },
      }}
      {...(isEditable ? { editMode: "row" } : {})}
      {...props}
      sx={{
        "& .MuiDataGrid-toolbarContainer": {
          padding: "8px",
          backgroundColor: "#F8FAFC",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        },
        "& .MuiInputBase-root": {
          borderRadius: "20px",
          backgroundColor: "white",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
        },
        "& .MuiTablePagination-root": {
          color: "#666",
        },
        ...props.sx
      }}
    />
  );
}