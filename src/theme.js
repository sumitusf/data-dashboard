import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#006747", // USF Green
    },
    secondary: {
      main: "#CFC493", // USF Gold
    },
    background: {
      default: "#f5f6f9", // Light Grey
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: "bold" },
    h6: { fontWeight: "bold" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#006747",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#ffffff",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
