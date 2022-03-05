import { CssBaseline, Box, Typography, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import NavigationContext from "../../context/NavigationContext";
import axios from "axios";

const HomePage = () => {
    const { setLinkActive } = useContext(NavigationContext);
    const [votd, setVotd] = useState(null);

    useEffect(() => {
        setLinkActive("Home");
        const getVotd = async () => {
            let response = await axios.get(
                "https://labs.bible.org/api/?passage=votd&type=json"
            );

            setVotd(response.data);
        };
        getVotd();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBar />
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                            mb={5}
                        >
                            Tuis
                        </Typography>
                        {votd && (
                            <Typography
                                variant="h4"
                                align="center"
                                color="text.secondary"
                                paragraph
                            >
                                {votd[0].bookname} {votd[0].chapter}:{" "}
                                {votd[0].verse} - {votd[votd.length - 1].verse}
                            </Typography>
                        )}
                        {votd &&
                            votd.map((verse) => (
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="text.secondary"
                                    paragraph
                                    key={verse.verse}
                                >
                                    "{verse.verse}" {verse.text}
                                </Typography>
                            ))}
                    </Container>
                </Box>
            </main>
        </div>
    );
};

export default HomePage;
