'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true,
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          border: 'none',
          borderRadius: '10px',
          '& .MuiDataGrid-row': {
            '&:nth-of-type(odd)': {
              backgroundColor: '#F8FAFC',
            },
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#E6F3FF',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '0.95rem',
          },
          '& .MuiDataGrid-columnHeader': {
            '&:focus, &:focus-within': {
              outline: 'none',
            },
          },
        },
        columnHeader: {
          paddingLeft: '16px',
        },
        cell: {
          paddingLeft: '16px',
        },
        toolbar: {
          '& .MuiButton-root': {
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#E6F3FF',
            },
          },
          '& .MuiFormControl-root': {
            marginRight: '8px',
          },
        },
      },
    },
  },
});

export default theme;
