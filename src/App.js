import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePages from "./pages/HomePages";
import MovieDetails from "./pages/MovieDetails";
import BrowsePage from "./pages/BrowsePage";

import MainLayout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import DataContextProvider from "./contexts/DataContext";
import AccountPage from "./pages/AccountPage";
import { AuthProvider } from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";
import FavoriteContextProvider from "./contexts/FavoriteContext";
import AuthRequire from "./contexts/AuthRequire";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";


function App() {
  const location = useLocation();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00b4cc",
      },
      secondary: {
        main: "#9dbfaf",
      },
    },
  });
  return (
    <div className="App">

      <>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <FavoriteContextProvider>
              <Routes location={location.state?.backgroundLocation || location}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePages />} />
                  <Route
                    path="/browser"
                    element={
                      <DataContextProvider>
                        <BrowsePage />
                      </DataContextProvider>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/favorite"
                    element={
                      <AuthRequire>
                        <AccountPage />
                      </AuthRequire>
                    }
                  />
                  <Route path="/movie/:movieId" element={<MovieDetails />} />
                </Route>
              </Routes>
            </FavoriteContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </>
    </div>
  );
}

export default App;
