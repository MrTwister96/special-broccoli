import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
    CssBaseline,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseAppURL, baseURL } from "../../hooks/useAxios";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import dayjs from "dayjs";

import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import ChurchIcon from "@mui/icons-material/Church";

import { WhatsappShareButton, WhatsappIcon } from "react-share";

const SermonPage = () => {
    let { sermonId } = useParams();
    const [sermon, setSermon] = useState(null);

    useEffect(() => {
        const getSermon = async () => {
            let response = await axios.get(
                `${baseURL}/api/sermons/${sermonId}`
            );

            if (response.status === 200) {
                setSermon(response.data);
            }
        };

        getSermon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <NavBar />
            <CssBaseline />
            {sermon && (
                <main>
                    {/* <PageHeading sermon={sermon} /> */}
                    <Container sx={{ pt: 5 }} maxWidth="lg">
                        <Grid container spacing={2} className="justify-center">
                            <Grid item xs={12} sm={12} md={8}>
                                <AudioPlayer
                                    src={`${baseURL}/api/sermons/${sermon.id}/get_audio/`}
                                    onPlay={(e) => console.log("onPlay")}
                                    progressJumpStep={30000}
                                    volume={0.2}
                                    autoPlay
                                    // other props here
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <List
                                    sx={{
                                        width: "100%",
                                        bgcolor: "action.hover",
                                    }}
                                    className="rounded-lg"
                                >
                                    <ListItem>
                                        <div className="flex px-4 py-2 w-full items-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <EventIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Datum"
                                                secondary={dayjs(
                                                    sermon.date
                                                ).format(
                                                    "dddd DD MMM YYYY HH:mm A"
                                                )}
                                            />
                                        </div>
                                    </ListItem>

                                    <ListItem>
                                        <div className="flex px-4 py-2 w-full items-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Prediker"
                                                secondary={`${sermon.preacher_label}`}
                                            />
                                        </div>
                                    </ListItem>

                                    <ListItem>
                                        <div className="flex px-4 py-2 w-full items-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ChurchIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Tema"
                                                secondary={sermon.theme}
                                            />
                                        </div>
                                    </ListItem>

                                    <ListItem>
                                        <div className="flex px-4 py-2 w-full items-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <DescriptionIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Skriflesing"
                                                secondary={sermon.scripture}
                                            />
                                        </div>
                                    </ListItem>

                                    <ListItem>
                                        <div className="flex px-4 py-2 w-full items-center">
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <DownloadIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Aflaai/Luister Telling"
                                                secondary={
                                                    sermon.download_count
                                                }
                                            />
                                            <WhatsappShareButton
                                                url={`${baseAppURL}/preke/${sermon.id}/`}
                                                className="mr-1"
                                            >
                                                <WhatsappIcon
                                                    size={32}
                                                    round={true}
                                                />
                                            </WhatsappShareButton>
                                            <IconButton
                                                color="primary"
                                                aria-label="download"
                                                variant="contained"
                                                component="a"
                                                href={`${baseURL}/api/sermons/${sermon.id}/get_audio/`}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            )}
        </>
    );
};

export default SermonPage;
