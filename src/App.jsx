import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import Shop from "./Shop";
import Routers from "./routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "400",
        lineHeight: "normal",
      },
    },
  });

  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Toaster
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            maxWidth: "unset",
          },
          position: "bottom-center",
        }}
      />
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </div>
    // </ThemeProvider>
  );
}

export default App;
