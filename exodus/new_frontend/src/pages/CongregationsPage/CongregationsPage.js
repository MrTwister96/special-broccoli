import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import NavigationContext from "../../context/NavigationContext";
import StoreContext from "../../context/StoreContext";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import CongregationCard from "../../components/CongregationCard";
import {
    TextField,
    CircularProgress,
    Backdrop,
    Snackbar,
    Alert,
    AlertTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import notFound from "./notFound.svg";

const CongregationsPage = () => {
    const { setLinkActive } = useContext(NavigationContext);
    const { congregations, error, clearError } = useContext(StoreContext);

    const [localCongregations, setLocalCongregations] = useState(null);
    const [searchParam] = useState(["name"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLinkActive("Congregations");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (congregations.length !== 0) {
            setLocalCongregations(congregations);
            setLoading(false);
        }
    }, [congregations]);

    const search = (e) => {
        let searchValue = e.target.value;

        let searchedItems = congregations.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                );
            });
        });

        setLocalCongregations(searchedItems);
    };

    return (
        <>
            {/* Error Messages */}
            <Snackbar
                open={error.status}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={clearError}
            >
                <Alert
                    onClose={clearError}
                    severity="error"
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    <AlertTitle>Foutboodskap</AlertTitle>
                    {error.message}
                </Alert>
            </Snackbar>
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
                    {localCongregations && (
                        <Container sx={{ py: 5 }} maxWidth="lg">
                            {/* End hero unit */}
                            {localCongregations.length === 0 ? (
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
                                    {localCongregations.map((item) => (
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
                                                image={item.image_file}
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
