import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import StoreContext from "../../context/StoreContext";

const ProtectedRoute = ({ user, page, children }) => {
    const { raiseError } = useContext(StoreContext);

    useEffect(() => {
        if (!user) {
            raiseError(
                "Meld asseblief aan om toegang tot hierdie bladsy te kry"
            );
        } else if (
            page === "new_sermon" &&
            !user.permissions.includes("sermon_admin") &&
            !user.permissions.includes("super_admin")
        ) {
            raiseError(
                "Jy het nie toestemming om hierdie bladsy te beskou nie"
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return <Navigate to="/inteken" replace />;
    } else if (
        page === "new_sermon" &&
        !user.permissions.includes("sermon_admin") &&
        !user.permissions.includes("super_admin")
    ) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
