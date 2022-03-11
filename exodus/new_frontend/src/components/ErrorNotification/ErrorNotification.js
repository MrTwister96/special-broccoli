import React, { useContext } from "react";
import {
    Snackbar,
    Alert,
    AlertTitle,
} from "@mui/material";
import StoreContext from "../../context/StoreContext";

const ErrorNotification = () => {
    const { error, clearError } = useContext(StoreContext);
    return (
        <Snackbar
            open={error.status}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={clearError}
        >
            <Alert
                onClose={clearError}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
            >
                <AlertTitle>Foutboodskap</AlertTitle>
                {error.message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorNotification;
