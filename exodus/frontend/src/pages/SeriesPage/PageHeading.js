import React from "react";
import { Box, Typography, Container, Stack, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const PageHeading = ({ series, search }) => {
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                pt: 8,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {series.name}
                </Typography>
                {series.congregation_name && (
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        ({series.congregation_name})
                    </Typography>
                )}
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
                    sx={{ mt: 5, mb: 4 }}
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
                            label="Soek Preek"
                            name="Soek"
                            variant="standard"
                            onChange={search}
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default PageHeading;
