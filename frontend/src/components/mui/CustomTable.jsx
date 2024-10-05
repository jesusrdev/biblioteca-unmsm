"use client";
import React, { useState } from 'react';
import { DataGrid, GridToolbar, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Date.now();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title' },
    }));
  };

  return (
    <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
      Agregar Libro
    </Button>
  );
}

export default function CustomTable({ rows, loading, onRowAdd, onRowUpdate, onRowDelete, columns }) {
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    onRowDelete(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      onRowDelete(id);
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    if (newRow.isNew) {
      onRowAdd(updatedRow);
    } else {
      onRowUpdate(updatedRow);
    }
    return updatedRow;
  };

  const actionColumn = {
    field: 'actions',
    type: 'actions',
    headerName: 'Acciones',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Save"
            sx={{ color: 'primary.main' }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  };

  const allColumns = [...columns, actionColumn];

  return (
    <DataGrid
      rows={rows}
      columns={allColumns}
      loading={loading}
      density="comfortable"
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: GridToolbar,
      }}
      slotProps={{
        toolbar: { 
          setRows: onRowAdd, 
          setRowModesModel,
          children: <EditToolbar setRows={onRowAdd} setRowModesModel={setRowModesModel} />
        },
      }}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
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
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    />
  );
}