import React from "react";
import { Box, Typography, Container, Stack, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const PageHeading = ({ search }) => {
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
                    Reekse
                </Typography>
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
