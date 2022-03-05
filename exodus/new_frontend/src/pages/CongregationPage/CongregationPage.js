import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { CssBaseline, Container, Grid } from "@mui/material";
import StoreContext from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import PageHeading from "./PageHeading";
import InformationSection from "./InformationSection";
import SermonsSection from "./SermonsSection";
import { baseURL } from "../../hooks/useAxios";
import axios from "axios";

const CongregationPage = () => {
    let { slug } = useParams();
    const navigate = useNavigate();

    const { congregations, raiseError } = useContext(StoreContext);
    const [congregation, setCongregation] = useState(null);
    const [sermons, setSermons] = useState(null);
    const [globalSermons, setGlobalSermons] = useState(null);

    useEffect(() => {
        if (congregations.length !== 0) {
            const found = congregations.find((item) => item.slug === slug);
            if (!found) {
                raiseError(
                    `"${slug}" is nie n bestaande gemeente nie. Kies n bestaande gemeente`
                );
                navigate("/gemeentes");
            }
            setCongregation(found);

            const getSermons = async () => {
                let response = await axios.get(
                    `${baseURL}/api/sermons/?congregation=${found.id}`
                );

                if (response.status === 200) {
                    setSermons(response.data);
                    setGlobalSermons(response.data);
                }
            };

            getSermons();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [congregations]);

    const [searchParam] = useState([
        "theme",
        "scripture",
        "preacher_name",
        "preacher_surname",
    ]);

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
    };

    return (
        <>
            <NavBar />
            <CssBaseline />
            {congregation && (
                <main>
                    <PageHeading congregation={congregation} />

                    <Container sx={{ py: 5 }} maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <InformationSection
                                    congregation={congregation}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                {sermons && (
                                    <SermonsSection
                                        sermons={sermons}
                                        search={search}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            )}
        </>
    );
};

export default CongregationPage;
