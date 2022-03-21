import React from "react";
import { Box, Typography, Container } from "@mui/material";

const PageHeading = () => {
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
            </Container>
        </Box>
    );
};

export default PageHeading;
