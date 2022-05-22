import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#f57c00",
      light: "#ffb74d",
      dark: "#e65100",
      contrastText: "#263238",
    },
    secondary: {
      main: "#1e88e5",
      light: "#42a5f5",
      dark: "#0d47a1",
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
