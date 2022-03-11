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
    const { raiseError } = useContext(StoreContext);
    const [congregation, setCongregation] = useState(null);
    const [sermons, setSermons] = useState(null);
    const [globalSermons, setGlobalSermons] = useState(null);

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
