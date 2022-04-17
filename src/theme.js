import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#d32f2f",
      light: "#e57373",
      dark: "#b71c1c",
    },
    secondary: {
      main: "#3949ab",
      light: "#5c6bc0",
      dark: "#1a237e",
    },
    background: {
      default: "#e6e3e3",
      paper: "#eceff1",
    },
    success: {
      main: "#43a047",
    },
    info: {
      main: "#29b6f6",
      light: "#81d4fa",
      dark: "#0097a7",
      contrastText: "#ffa726",
    },
  },
});
export default theme;
