import { createContext, useState, useEffect } from "react";
import { baseURL } from "../hooks/useAxios";
import axios from "axios";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [congregations, setCongregations] = useState([]);
    const [preachers, setPreachers] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState({
        status: false,
        message: "",
    });

    const getCongregations = async () => {
        let response = await axios.get(`${baseURL}/api/congregations/`);

        if (response.status === 200) {
            setCongregations(response.data);
        }
    };

    const getPreachers = async () => {
        let response = await axios.get(`${baseURL}/api/preachers/`);

        if (response.status === 200) {
            setPreachers(response.data);
        }
    };

    const getSermons = async () => {
        let response = await axios.get(`${baseURL}/api/sermons/`);

        if (response.status === 200) {
            setSermons(response.data);
        }
    };

    const getSeries = async () => {
        let response = await axios.get(`${baseURL}/api/series/`);

        if (response.status === 200) {
            setSeries(response.data);
        }
    };

    const addSermon = (sermon) => {
        let newSermons = [...sermons, sermon];
        setSermons(newSermons);
    };

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

    useEffect(() => {
        getCongregations();
        getPreachers();
        getSermons();
        getSeries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let contextData = {
        congregations: congregations,
        preachers: preachers,
        sermons: sermons,
        series: series,
        error: error,
        addSermon: addSermon,
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
