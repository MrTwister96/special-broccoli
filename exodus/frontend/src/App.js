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
import SeriesPage from "./pages/SeriesPage";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const theme = createTheme();

theme.typography.h3 = {
    fontSize: "1.6rem",
    "@media (min-width:600px)": {
        fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "3rem",
    },
};

theme.typography.h5 = {
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
                <Route path="/reekse/:seriesId" element={<SeriesPage />} />
                <Route
                    path="/preek/skep"
                    element={
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <ProtectedRoute user={user}>
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
