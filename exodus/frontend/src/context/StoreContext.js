import { createContext, useState, useEffect } from "react";
import { baseURL } from "../utils/useAxios";
import axios from "axios";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [congregations, setCongregations] = useState([
        {
            id: 0,
            label: "----------",
        },
    ]);
    const [preachers, setPreachers] = useState([
        {
            id: 0,
            label: "----------",
        },
    ]);
    const [sermons, setSermons] = useState([]);
    const [series, setSeries] = useState([]);

    const getCongregations = async () => {
        let response = await axios.get(`${baseURL}/api/congregations/`);

        if (response.status == 200) {
            let backendItems = response.data;
            let newItems = congregations;

            backendItems.map((item) => {
                item.label = item.name;
                newItems = [...newItems, item];
            });
            setCongregations(newItems);
        }
    };

    const getPreachers = async () => {
        let response = await axios.get(`${baseURL}/api/preachers/`);

        if (response.status == 200) {
            let backendItems = response.data;
            let newItems = preachers;

            backendItems.map((item) => {
                item.label = `${item.surname}, ${item.name} (${item.title})`;
                newItems = [...newItems, item];
            });
            setPreachers(newItems);
        }
    };

    const getSermons = async () => {
        let response = await axios.get(`${baseURL}/api/sermons/`);

        if (response.status == 200) {
            setSermons(response.data);
        }
    };

    const getSeries = async () => {
        let response = await axios.get(`${baseURL}/api/series/`);

        if (response.status == 200) {
            setSeries(response.data);
        }
    };

    const addSermon = (sermon) => {
        let newSermons = [...sermons, sermon];
        setSermons(newSermons);
    };

    useEffect(() => {
        getCongregations();
        getPreachers();
        getSermons();
        getSeries();
    }, []);

    let contextData = {
        congregations: congregations,
        preachers: preachers,
        sermons: sermons,
        series: series,
        addSermon: addSermon,
    };

    return (
        <StoreContext.Provider value={contextData}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContext;
