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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return <Navigate to="/inteken" replace />;
    }

    return children;
};

export default ProtectedRoute;
