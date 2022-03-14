import React from "react";
import {
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import LanguageIcon from "@mui/icons-material/Language";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";

const InformationSection = ({ congregation }) => {
    return (
        <>
            <Typography
                className="w-full pb-3 text-center"
                component="h1"
                variant="h5"
            >
                Informasie
            </Typography>
            <List
                sx={{
                    width: "100%",
                    bgcolor: "action.hover",
                }}
                className="rounded-lg"
            >
                {congregation.address && (
                    <ListItem>
                        <ListItemButton
                            component="a"
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                congregation.address
                            )}`}
                            target="_blank"
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <MapIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Adres"
                                secondary={congregation.address}
                            />
                        </ListItemButton>
                    </ListItem>
                )}

                {congregation.preachers.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Leraar"
                                secondary={`${item.title} ${item.name} ${item.surname}`}
                                className="break-all"
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

                {congregation.website && (
                    <ListItem>
                        <ListItemButton
                            component="a"
                            href={congregation.website}
                            target="_blank"
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <LanguageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Webwerf"
                                secondary={congregation.website}
                                className="break-all"
                            />
                        </ListItemButton>
                    </ListItem>
                )}

                {congregation.facebook_page && (
                    <ListItem>
                        <ListItemButton
                            component="a"
                            href={congregation.facebook_page}
                            target="_blank"
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FacebookIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Facebook"
                                secondary={congregation.facebook_page}
                                className="break-all"
                            />
                        </ListItemButton>
                    </ListItem>
                )}

                {congregation.email && (
                    <ListItem>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <EmailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="e-Pos"
                                secondary={congregation.email}
                                className="break-all"
                            />
                        </ListItemButton>
                    </ListItem>
                )}

                {congregation.contact_number && (
                    <ListItem>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <CallIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Kontak Nommer"
                                secondary={congregation.contact_number}
                                className="break-all"
                            />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </>
    );
};

export default InformationSection;
