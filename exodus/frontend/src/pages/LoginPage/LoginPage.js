import React, { useContext, useEffect, useState } from "react";
import {
    Typography,
    Button,
    CssBaseline,
    TextField,
    Box,
    Container,
    Backdrop,
    CircularProgress,
} from "@mui/material";
import KerkLogo from "../../images/KerkLogo.svg";
import LogoDark from "../../images/Logo_Dark.svg";
import Copyright from "./Copyright";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StoreContext from "../../context/StoreContext";
import ErrorNotification from "../../components/ErrorNotification";

const LoginPage = () => {
    const { user, loginUser } = useContext(AuthContext);
    const { raiseError } = useContext(StoreContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (event) => {
        setLoading(true);

        let loginStatus = await loginUser(event);

        if (loginStatus.status === false) {
            setLoading(false);
            raiseError("Verkeerde gebruikersnaam of wagwoord");
        } else if (loginStatus.status === true) {
            navigate("/");
        }
    };

    return (
        <>
            {/* Error Messages */}
            <ErrorNotification />
            {/* Loading Backdrop */}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: "flex",
                    flexDirection: "column",
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
                {/* <Typography component="h1" variant="h5">
                    Besig om aan te meld...
                </Typography> */}
            </Backdrop>
            {/* Main Content */}
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        className="mx-auto h-40 w-auto"
                        src={KerkLogo}
                        alt="Logo"
                    />
                    <img
                        className="mx-auto h-14 w-auto"
                        src={LogoDark}
                        alt="Logo"
                    />
                    <Typography component="h1" variant="h5">
                        Inteken
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Gebruikernaam"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Wagwoord"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Inteken
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
};

export default LoginPage;
