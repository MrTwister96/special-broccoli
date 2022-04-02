import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

const CardLink = ({ image, title, description, onClick }) => {
    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card className="min-h-full">
                <CardActionArea onClick={onClick}>
                    <CardMedia
                        component="img"
                        className="h-40"
                        image={image}
                        alt="card picture"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {title}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default CardLink;
