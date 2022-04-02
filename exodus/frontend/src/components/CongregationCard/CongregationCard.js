import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, Paper, styled, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const CongregationCard = ({ id, name, image, slug }) => {
    const navigate = useNavigate();

    return (
        <Card className="h-full">
            <CardActionArea
                onClick={() => {
                    navigate(`/gemeente/${slug}`);
                }}
                className="h-full"
            >
                <CardMedia
                    component="img"
                    className="h-40"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Stack direction="row" spacing={2}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={3}>
                                    <Item>
                                        <ChurchIcon />
                                    </Item>
                                </Grid> */}
                                <Grid item xs={12}>
                                    {/* <Item>{name}</Item> */}
                                    <Item>{name}</Item>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CongregationCard;
