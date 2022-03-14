import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { CssBaseline, Container, Grid, CircularProgress } from "@mui/material";
import StoreContext from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "./PageHeading";
import InformationSection from "./InformationSection";
import SermonsSection from "./SermonsSection";
import { baseURL } from "../../hooks/useAxios";
import axios from "axios";
import SeriesSection from "./SeriesSection";

const CongregationPage = () => {
    let { slug } = useParams();
    const navigate = useNavigate();
    const { raiseError } = useContext(StoreContext);
    const [congregation, setCongregation] = useState(null);
    const [sermons, setSermons] = useState(null);
    const [globalSermons, setGlobalSermons] = useState(null);
    const [loading, setLoading] = useState(true);

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [sermonsPerPage, setSermonsPerPage] = useState(10);

    const indexOfLastSermon = currentPage * sermonsPerPage;
    const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
    const currentSermons = sermons?.slice(
        indexOfFirstSermon,
        indexOfLastSermon
    );

    const handlePaginate = (event, page) => {
        setCurrentPage(page);
    };

    const initialize = async () => {
        let congregationResponse = await axios.get(
            `${baseURL}/api/congregations/?slug=${slug}`
        );

        if (congregationResponse.data.length !== 0) {
            congregationResponse.data.forEach(async (item) => {
                if (item.slug === slug) {
                    setCongregation(item);

                    let sermonsResponse = await axios.get(
                        `${baseURL}/api/sermons/?congregation=${item.id}`
                    );

                    setSermons(sermonsResponse.data);
                    setGlobalSermons(sermonsResponse.data);
                    setPages(
                        Math.ceil(sermonsResponse.data.length / sermonsPerPage)
                    );

                    setLoading(false);
                }
            });
        } else {
            raiseError(
                `"${slug}" is nie n bestaande gemeente nie. Kies n bestaande gemeente`
            );
            navigate("/gemeentes");
        }
    };

    useEffect(() => {
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchParam] = useState(["theme", "scripture", "preacher_label"]);

    const search = (e) => {
        let searchValue = e.target.value;

        let searchedItems = globalSermons.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                );
            });
        });

        setSermons(searchedItems);
        setPages(Math.ceil(searchedItems.length / sermonsPerPage));
        setCurrentPage(1);
    };

    return (
        <>
            <NavBar />
            <CssBaseline />
            {congregation && (
                <main>
                    {loading ? (
                        <div className="min-h-screen justify-center items-center flex bg-gray-100 rounded-xl">
                            <CircularProgress />
                        </div>
                    ) : (
                        <>
                            <PageHeading congregation={congregation} />

                            <Container sx={{ py: 5 }} maxWidth="lg">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={8}>
                                        {sermons && (
                                            <SermonsSection
                                                sermons={currentSermons}
                                                sermonCount={
                                                    globalSermons?.length
                                                }
                                                search={search}
                                                handlePaginate={handlePaginate}
                                                pages={pages}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <SeriesSection
                                            congregationId={congregation.id}
                                        />
                                        <InformationSection
                                            congregation={congregation}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </>
                    )}
                </main>
            )}
        </>
    );
};

export default CongregationPage;
