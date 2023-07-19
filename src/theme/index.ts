import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px'
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
