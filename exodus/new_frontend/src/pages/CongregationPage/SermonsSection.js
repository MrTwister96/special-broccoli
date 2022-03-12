import React from "react";
import {
    Typography,
    AccordionActions,
    Button,
    Divider,
    Paper,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    Box,
    TextField,
    Pagination,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";

import DownloadIcon from "@mui/icons-material/Download";
import HeadsetIcon from "@mui/icons-material/Headset";
import { baseAppURL, baseURL } from "../../hooks/useAxios";

import filesize from "filesize";
import { useNavigate } from "react-router-dom";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

const SermonsSection = ({
    sermons,
    search,
    handlePaginate,
    pages,
    sermonCount,
}) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Typography
                className="w-full text-center"
                component="h1"
                variant="h5"
            >
                Preke ({sermonCount})
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
                        label="Soek"
                        name="Soek"
                        variant="standard"
                        onChange={search}
                    />
                </Box>
            </Stack>
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
                            onChange={handlePaginate}
                        />
                    </Box>
                </Stack>
            )}

            {sermons.map((item) => (
                <Accordion
                    key={item.id}
                    expanded={expanded === item.id}
                    onChange={handleChange(item.id)}
                    sx={{
                        bgcolor: "action.hover",
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <div className="flex flex-col w-full">
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "subtitle2.fontSize",
                                }}
                                variant="overline"
                                className="break-all"
                            >
                                {item.theme}
                            </Typography>
                            {/* <Divider />
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.secondary",
                                    fontSize: "subtitle2.fontSize",
                                }}
                                variant="overline"
                                className="break-all"
                            >
                                {item.scripture}
                                <Divider />
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        color: "text.secondary",
                                        fontSize: "subtitle2.fontSize",
                                    }}
                                    variant="overline"
                                    className="break-all"
                                >
                                    {item.preacher_label}
                                </Typography>
                            </Typography> */}
                            <Divider />
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "subtitle2.fontSize",
                                }}
                                variant="overline"
                                className="break-all"
                            >
                                {dayjs(item.date).format("DD MMM YYYY HH:mm A")}
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className="flex flex-col">
                        <Paper className="p-2" elevation={4}>
                            <div className="flex flex-row">
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                    mr={2}
                                >
                                    Prediker:
                                </Typography>
                                <Typography variant="overline">
                                    {item.preacher_label}
                                </Typography>
                            </div>
                            <div className="flex flex-row">
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                    mr={2}
                                >
                                    Tema:
                                </Typography>
                                <Typography variant="overline">
                                    {item.theme}
                                </Typography>
                            </div>
                            <div className="flex flex-row">
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                    mr={2}
                                >
                                    Skriflesing:
                                </Typography>
                                <Typography variant="overline">
                                    {item.scripture}
                                </Typography>
                            </div>
                        </Paper>
                    </AccordionDetails>
                    <AccordionActions className="flex flex-col md:flex-row ">
                        <Button
                            startIcon={<DownloadIcon />}
                            variant="contained"
                            component="a"
                            href={`${baseURL}/api/sermons/${item.id}/get_audio/`}
                        >
                            Aflaai ({filesize(item.audio_file_size)})
                        </Button>
                        <div className="mt-2 md:mt-0 md:ml-2">
                            <Button
                                startIcon={<HeadsetIcon />}
                                variant="contained"
                                component="a"
                                onClick={() => {
                                    navigate(`/preke/${item.id}`);
                                }}
                            >
                                Luister
                            </Button>
                        </div>

                        <div className="md:ml-2">
                            <IconButton
                                color="primary"
                                aria-label="download"
                                component="div"
                            >
                                <WhatsappShareButton
                                    url={`${baseAppURL}/preke/${item.id}/`}
                                >
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                            </IconButton>
                        </div>
                    </AccordionActions>
                </Accordion>
            ))}
        </>
    );
};

export default SermonsSection;
