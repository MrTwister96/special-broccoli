import { createContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [error, setError] = useState({
        status: false,
        message: "",
    });

    const raiseError = (errorMessage) => {
        setError({
            status: true,
            message: errorMessage,
        });
    };

    const clearError = () => {
        setError({
            status: false,
            message: error.message,
        });
    };

    let contextData = {
        error: error,
        raiseError: raiseError,
        clearError: clearError,
    };

    return (
        <StoreContext.Provider value={contextData}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContext;
