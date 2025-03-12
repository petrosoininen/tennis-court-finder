import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Tennis court green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FFA726', // Warm orange for CTAs
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#D32F2F', // For last minute deals
      light: '#EF5350',
      dark: '#C62828',
    },
    success: {
      main: '#388E3C', // For "great finds"
      light: '#4CAF50',
      dark: '#2E7D32',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});
