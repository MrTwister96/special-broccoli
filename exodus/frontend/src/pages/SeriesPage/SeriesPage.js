// UI
import React, { useContext, useEffect, useState } from "react";
import {
    CssBaseline,
    CircularProgress,
    Backdrop,
    Container,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
} from "@mui/material";
import notFound from "../../images/notFound.svg";
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
    const [filteredSeries, setFilteredSeries] = useState(null);
    // Navigation
    const navigate = useNavigate();

    const getSeries = async () => {
        try {
            let response = await axios.get(`${baseURL}/api/series`);

            setSeries(response.data);
            setFilteredSeries(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (e) {
            raiseError("Daar was n vout. probeer aseblief weer");
            navigate("/");
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await getSeries();
        };

        setLinkActive("Series");
        initialize();
        // eslint-disable-next-line
    }, []);

    const [searchParams] = useState([
        "congregation_name",
        "description",
        "label",
        "name",
        "preacher_label",
        "preacher_name",
        "category_name",
    ]);

    const search = (e) => {
        let searchValue = e.target.value;

        let searchedItems = series.filter((item) => {
            // eslint-disable-next-line
            return searchParams.some((newItem) => {
                if (item[newItem] !== null) {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchValue.toLowerCase()) > -1
                    );
                }
            });
        });

        setFilteredSeries(searchedItems);
    };

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
                        <PageHeading search={search} />
                        <Container maxWidth="lg" className="mt-5 mb-5 z-0">
                            {series.length === 0 ? (
                                <div className="justify-center flex flex-col my-5">
                                    <Typography
                                        component="h1"
                                        variant="h4"
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
                                    {filteredSeries.map((item, index) => (
                                        <Grid
                                            key={item.id}
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={4}
                                        >
                                            <Card className="h-full">
                                                <CardActionArea
                                                    className="h-full"
                                                    onClick={() => {
                                                        navigate(
                                                            `/reekse/${item.id}`
                                                        );
                                                    }}
                                                >
                                                    <CardContent className="h-full flex flex-col justify-between">
                                                        <Typography
                                                            variant="h6"
                                                            component="div"
                                                            mb={2}
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        {item.category_name ? (
                                                            <Typography
                                                                sx={{ mb: 1.5 }}
                                                                color="text.secondary"
                                                            >
                                                                Kategorie:{" "}
                                                                {
                                                                    item.category_name
                                                                }
                                                            </Typography>
                                                        ) : (
                                                            <Typography
                                                                sx={{ mb: 1.5 }}
                                                                color="text.secondary"
                                                            >
                                                                Kategorie:
                                                                Algemeen
                                                            </Typography>
                                                        )}
                                                        {item.congregation_name && (
                                                            <Typography variant="body2">
                                                                Gemeente:{" "}
                                                                {
                                                                    item.congregation_name
                                                                }
                                                            </Typography>
                                                        )}
                                                        {item.preacher_label && (
                                                            <Typography variant="body2">
                                                                Prediker:{" "}
                                                                {
                                                                    item.preacher_label
                                                                }
                                                            </Typography>
                                                        )}
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Container>
                    </>
                )}
            </main>
        </>
    );
};

export default SeriesPage;
