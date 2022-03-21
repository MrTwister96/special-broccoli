import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import CongregationsPage from "./pages/CongregationsPage";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./context/AuthContext";
import CreateSermonPage from "./pages/CreateSermonPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CongregationPage from "./pages/CongregationPage";
import SermonPage from "./pages/SermonPage";
import SeriePage from "./pages/SeriePage";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const theme = createTheme();

theme.typography.h2 = {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: 300,
    lineHeight: 1.2,
    letterSpacing: "-0.00833em",
    fontSize: "2rem",
    [theme.breakpoints.up("md")]: {
        fontSize: "3.75rem",
    },
};

theme.typography.h3 = {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: 400,
    lineHeight: 1.167,
    letterSpacing: "0em",
    fontSize: "1.6rem",
    "@media (min-width:600px)": {
        fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "3rem",
    },
};

theme.typography.h5 = {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: "0em",
    fontSize: "0.9rem",
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.5rem",
    },
};

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gemeentes" element={<CongregationsPage />} />
                <Route path="/gemeente/:slug" element={<CongregationPage />} />
                <Route path="/preke/:sermonId" element={<SermonPage />} />
                <Route path="/reekse/:seriesId" element={<SeriePage />} />
                <Route
                    path="/preek/skep"
                    element={
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <ProtectedRoute user={user} page={"new_sermon"}>
                                <CreateSermonPage />
                            </ProtectedRoute>
                        </LocalizationProvider>
                    }
                />
                <Route path="/inteken" element={<LoginPage />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
