import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HomePageBanner from "../../images/HomePageBanner.jpg";

const pageInfo = {
    title: "Evangelies Gereformeerde Kerk van Suid-Afrika: Klank Bediening",
    verseHeader: "Romeine 1:16",
    verseBody:
        '"WANT ek skaam my nie oor die evangelie van Christus nie, want dit is \'n krag van God tot redding vir elkeen wat glo, eerste vir die Jood en ook vir die Griek."',
    linkText: "Continue reading…",
};

const Banner = () => {
    return (
        <Paper
            sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${HomePageBanner})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: "none" }}
                    src={HomePageBanner}
                    alt="Banner"
                />
            }
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,.3)",
                }}
            />

            <Grid container>
                <Grid item md={11}>
                    <Box
                        sx={{
                            position: "relative",
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            {pageInfo.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {pageInfo.verseHeader}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {pageInfo.verseBody}
                        </Typography>
                        {/* <Link variant="subtitle1" href="#">
                            {pageInfo.linkText}
                        </Link> */}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Banner;
