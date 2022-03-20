import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import StoreContext from "../../context/StoreContext";

const ProtectedRoute = ({ user, children }) => {
    const { raiseError } = useContext(StoreContext);

    useEffect(() => {
        if (!user) {
            raiseError(
                "Meld asseblief aan om toegang tot hierdie bladsy te kry"
            );
        } else if (!user.permissions.includes("sermon_admin")) {
            raiseError("Jy het nie toestemming om hierdie bladsy te beskou nie")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return <Navigate to="/inteken" replace />;
    } else if (!user.permissions.includes("sermon_admin")) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
