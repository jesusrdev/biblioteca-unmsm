import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function CustomTable({ rows, columns, ...props }) {
  return (
    <DataGrid
      {...props}
      rows={rows}
      density="comfortable"
      columns={columns}
      pageSize={10}
      disableRowSelectionOnClick={true}
      pageSizeOptions={[10, 25, 50, 100]}
      getRowId={(row) => row._links.self.href}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
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
      }}
    />
  );
}
