import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
    CssBaseline,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Container,
    CardActionArea,
    Grid,
} from "@mui/material";
import StoreContext from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "./PageHeading";
import axios from "axios";
import { baseURL } from "../../hooks/useAxios";
import dayjs from "dayjs";
import notFound from "../../images/notFound.svg";

const SeriePage = () => {
    let { seriesId } = useParams();
    const navigate = useNavigate();
    const { raiseError } = useContext(StoreContext);
    const [series, setSeries] = useState(null);
    const [sermons, setSermons] = useState([]);
    const [filteredSermons, setFilteredSermons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            try {
                let seriesResponse = await axios.get(
                    `${baseURL}/api/series/${seriesId}`
                );

                setSeries(seriesResponse.data);

                let sermonsResponse = await axios.get(
                    `${baseURL}/api/series/${seriesId}/sermons`
                );

                setSermons(sermonsResponse.data);
                setFilteredSermons(sermonsResponse.data);
                setLoading(false);
            } catch (error) {
                if (error.response?.status === 404) {
                    raiseError(
                        `Geen reeks met id: ${seriesId}. Kies n reeks wat bestaan`
                    );
                } else {
                    raiseError("Daar was n vout. probeer aseblief weer");
                }
                navigate("/");
            }
        };

        initialize();

        // I don't know why but the page scrolls to the middle
        // after loading..
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    const [searchParams] = useState(["theme", "scripture", "preacher_label"]);

    const search = (e) => {
        let searchValue = e.target.value;

        let searchedItems = sermons.filter((item) => {
            return searchParams.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                );
            });
        });

        setFilteredSermons(searchedItems);
    };

    return (
        <>
            <NavBar />
            <CssBaseline />
            <main>
                {loading ? (
                    <div className="min-h-screen justify-center items-center flex bg-gray-100 rounded-xl">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <PageHeading series={series} search={search} />
                        <Container maxWidth="lg" className="mt-5 mb-5 z-0">
                            {filteredSermons.length === 0 ? (
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
                                    {filteredSermons.map((item, index) => (
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
                                                            `/preke/${item.id}`
                                                        );
                                                    }}
                                                >
                                                    <CardContent className="h-full flex flex-col justify-between">
                                                        <Typography
                                                            sx={{
                                                                fontSize: 14,
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            Boodskap{" "}
                                                            {(index += 1)}/
                                                            {sermons.length}
                                                        </Typography>
                                                        <Typography
                                                            variant="h5"
                                                            component="div"
                                                            mb={2}
                                                        >
                                                            {item.theme}
                                                        </Typography>
                                                        <Typography
                                                            sx={{ mb: 1.5 }}
                                                            color="text.secondary"
                                                        >
                                                            {dayjs(
                                                                item.date
                                                            ).format(
                                                                "DD MMM YYYY HH:mm A"
                                                            )}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Skriflesing:{" "}
                                                            {item.scripture}
                                                            <br />
                                                            Prediker:{" "}
                                                            {
                                                                item.preacher_label
                                                            }
                                                        </Typography>
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

export default SeriePage;
