import { createTheme } from '@mui/material/styles';

import { zinc } from 'tailwindcss/colors';

export const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: zinc[900]
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#207ce9'
    },
    secondary: {
      main: '#00aef7'
    },
    mode: 'dark'
  }
});
