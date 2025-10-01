import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dashboard from "./pages/Dashboard";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Data Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}
