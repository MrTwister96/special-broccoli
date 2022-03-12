import React, { useEffect, useState } from "react";
import {
    Typography,
    Stack,
    Box,
    TextField,
    Skeleton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { baseURL } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const SeriesSection = ({ congregationId }) => {
    const navigate = useNavigate();
    const [series, setSeries] = useState(null);
    const [filteredSeries, setFilteredSeries] = useState(null);
    const [loading, setLoading] = useState(true);

    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [seriesPerPage, setSeriesPerPage] = useState(10);

    const indexOfLastSeries = currentPage * seriesPerPage;
    const indexOfFirstSeries = indexOfLastSeries - seriesPerPage;
    const currentSeries = filteredSeries?.slice(
        indexOfFirstSeries,
        indexOfLastSeries
    );

    useEffect(() => {
        const getSeries = async () => {
            let seriesData = [];

            let response = await axios.get(
                `${baseURL}/api/series/?congregation=${congregationId}`
            );

            if (response.data.length !== 0) {
                response.data.forEach((item) => {
                    if (item.congregation === congregationId) {
                        seriesData = [...seriesData, item];
                    }
                });

                setSeries(seriesData);
                setFilteredSeries(seriesData);
                setPages(Math.ceil(seriesData.length / seriesPerPage));
            } else {
                setSeries([]);
                setFilteredSeries([]);
                setPages(0);
            }

            setLoading(false);
        };

        getSeries();
        // eslint-disable-next-line
    }, []);

    const [searchParams] = useState(["name", "description"]);

    const search = (e) => {
        let searchValue = e.target.value;

        let searchedItems = series.filter((item) => {
            return searchParams.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                );
            });
        });

        setFilteredSeries(searchedItems);
        setPages(Math.ceil(searchedItems.length / seriesPerPage));
        setCurrentPage(1);
    };

    return (
        <>
            <Typography
                className="w-full pb-3 text-center"
                component="h1"
                variant="h5"
            >
                Reekse ({series?.length})
            </Typography>
            <Stack
                sx={{ mt: 1, mb: 2 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        minWidth: "80%",
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
                        label="Soek Reeks"
                        name="Soek"
                        variant="standard"
                        onChange={search}
                    />
                </Box>
            </Stack>
            <div className="mb-2">
                {loading ? (
                    <Skeleton variant="rectangular" height={150} />
                ) : (
                    <>
                        {pages > 1 && (
                            <Stack
                                sx={{ mt: 1, mb: 2 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        minWidth: "80%",
                                    }}
                                    className="justify-center"
                                >
                                    <Pagination
                                        count={pages}
                                        color="primary"
                                        onChange={(event, page) => {
                                            setCurrentPage(page);
                                        }}
                                    />
                                </Box>
                            </Stack>
                        )}
                        {currentSeries.length > 0 && (
                            <List
                                sx={{
                                    width: "100%",
                                    bgcolor: "action.hover",
                                }}
                                className="rounded-lg"
                            >
                                {currentSeries.map((item) => (
                                    <ListItem disablePadding key={item.id}>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/reekse/${item.id}`);
                                            }}
                                        >
                                            <ListItemText
                                                primary={item.name}
                                                secondary={`Kategorie: ${item.category_name}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default SeriesSection;
