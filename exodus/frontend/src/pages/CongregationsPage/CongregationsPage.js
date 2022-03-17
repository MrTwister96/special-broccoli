import React, { useContext, useEffect, useState } from "react";
import {
    TextField,
    CircularProgress,
    Backdrop,
    CssBaseline,
    Grid,
    Stack,
    Box,
    Typography,
    Container,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import ErrorNotification from "../../components/ErrorNotification";
import CongregationCard from "../../components/CongregationCard";

import NavigationContext from "../../context/NavigationContext";
import StoreContext from "../../context/StoreContext";

import SearchIcon from "@mui/icons-material/Search";
import notFound from "./notFound.svg";

import { baseURL } from "../../hooks/useAxios";
import axios from "axios";


const CongregationsPage = () => {
    const { setLinkActive } = useContext(NavigationContext);
    const { raiseError } = useContext(StoreContext);
    const [congregations, setCongregations] = useState(null);
    const [globalCongregations, setGlobalCongregations] = useState(null);
    const [searchParam] = useState(["name"]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const initialize = async () => {
        try {
            let response = await axios.get(`${baseURL}/api/congregations/`);

            setCongregations(response.data);
            setGlobalCongregations(response.data);

            setLoading(false);
        } catch (error) {
            raiseError(
                "Gemeentes kon nie gelaai word nie. Probeer weer later of raporteer die vout"
            );
            navigate("/");
        }
    };

    useEffect(() => {
        setLinkActive("Congregations");
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const search = (e) => {
        let searchValue = e.target.value;

        let searchedItems = globalCongregations.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                );
            });
        });

        setCongregations(searchedItems);
    };

    return (
        <>
            {/* Error Messages */}
            <ErrorNotification />
            {/* Loading Backdrop */}
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
                {/* <Typography component="h1" variant="h5">
                        Besig om aan te meld...
                    </Typography> */}
            </Backdrop>
            <div>
                <NavBar />
                <CssBaseline />
                <main>
                    {/* Hero unit */}
                    <Box
                        sx={{
                            bgcolor: "background.paper",
                            pt: 8,
                            // pb: 6,
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                EG Kerk Gemeentes
                            </Typography>
                            {/* <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Something short and leading about the collection
                            below—its contents, the creator, etc. Make it short
                            and sweet, but not too short so folks don&apos;t
                            simply skip over it entirely.
                        </Typography> */}
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        minWidth: "100%",
                                    }}
                                >
                                    <SearchIcon
                                        sx={{
                                            color: "action.active",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Soek"
                                        name="Soek"
                                        variant="standard"
                                        onChange={search}
                                    />
                                </Box>
                            </Stack>
                        </Container>
                    </Box>
                    {congregations && (
                        <Container sx={{ py: 5 }} maxWidth="lg">
                            {/* End hero unit */}
                            {congregations.length === 0 ? (
                                <div className="justify-center flex flex-col">
                                    <Typography
                                        component="h1"
                                        variant="h3"
                                        className="text-center"
                                    >
                                        Geen Resultate
                                    </Typography>
                                    <img
                                        className="h-64 w-auto mt-16"
                                        src={notFound}
                                        alt="Geen Resultate"
                                    />
                                </div>
                            ) : (
                                <Grid container spacing={4}>
                                    {congregations.map((item) => (
                                        <Grid
                                            item
                                            key={item.id}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            // lg={3}
                                        >
                                            <CongregationCard
                                                id={item.id}
                                                name={item.name}
                                                image={`${baseURL}/api/congregations/${item.id}/image_file`}
                                                slug={item.slug}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Container>
                    )}
                </main>
            </div>
        </>
    );
};

export default CongregationsPage;
