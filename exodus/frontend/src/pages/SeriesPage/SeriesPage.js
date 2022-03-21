// UI
import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, CircularProgress, Backdrop } from "@mui/material";
//Components
import NavBar from "../../components/NavBar";
import PageHeading from "./PageHeading";
// Functionality
import axios from "axios";
import { baseURL } from "../../hooks/useAxios";
// Context
import NavigationContext from "../../context/NavigationContext";
import StoreContext from "../../context/StoreContext";
// Navigation
import { useNavigate } from "react-router-dom";

const SeriesPage = () => {
    // Context Data
    const { setLinkActive } = useContext(NavigationContext);
    const { raiseError } = useContext(StoreContext);
    // Functionality
    const [loading, setLoading] = useState(true);
    // Serverside Information
    const [series, setSeries] = useState(null);
    // Navigation
    const navigate = useNavigate();

    useEffect(() => {
        const initialize = async () => {
            try {
                let response = await axios.get(`${baseURL}/api/series`);

                setSeries(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (e) {
                raiseError("Daar was n vout. probeer aseblief weer");
                navigate("/");
            }
        };

        setLinkActive("Series");
        initialize();
    }, []);

    return (
        <>
            <NavBar />
            <CssBaseline />
            <main>
                {loading ? (
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : (
                    <>
                        <PageHeading />
                    </>
                )}
            </main>
        </>
    );
};

export default SeriesPage;
