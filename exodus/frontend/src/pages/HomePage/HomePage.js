import { CssBaseline, Container, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar";
import NavigationContext from "../../context/NavigationContext";
import Banner from "./Banner";
import CardLink from "./CardLink";
import congregation_image from "../../images/congregation_image.jpg";
import series_image from "../../images/series_image.jpg";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../../components/ErrorNotification";

const HomePage = () => {
    const navigate = useNavigate();
    const { setLinkActive } = useContext(NavigationContext);

    useEffect(() => {
        setLinkActive("Home");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBar />
            <CssBaseline />
            <ErrorNotification />
            <Container maxWidth="lg" className="mt-5 mb-5 z-0">
                <main>
                    <Banner />
                    <Grid container spacing={4}>
                        <CardLink
                            image={congregation_image}
                            title="Gemeentes"
                            description="Sien en deursoek die preke van elke EG Kerk Gemeente"
                            onClick={() => {
                                navigate(`/gemeentes`);
                            }}
                        />
                        <CardLink
                            image={series_image}
                            title="Reekse"
                            description="Sien en deursoek alle reekse van die EG Kerk"
                            onClick={() => {
                                navigate(`/reekse`);
                            }}
                        />
                    </Grid>
                </main>
            </Container>
        </div>
    );
};

export default HomePage;
