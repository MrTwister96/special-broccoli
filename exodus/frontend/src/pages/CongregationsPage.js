/* This example requires Tailwind CSS v2.0+ */
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import NavigationContext from "../context/NavigationContext";
import StoreContext from "../context/StoreContext";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CongregationsPage = () => {
    const { setLinkActive } = useContext(NavigationContext);
    const { congregations } = useContext(StoreContext);
    const [localCongregations, setLocalCongregations] = useState([]);

    useEffect(() => {
        setLinkActive("Congregations");
        getCongregations();
    }, []);

    useEffect(() => {
        getCongregations();
    }, [congregations]);

    const getCongregations = () => {
        let items = congregations;
        let newItems = [];

        items.map((item) => {
            if (item.id !== 0) {
                newItems = [...newItems, item];
            }
        });

        console.log(newItems);

        setLocalCongregations(newItems);
    };

    const [searchParam] = useState(["name", "address"]);

    const doSearch = (e) => {
        let search = e.target.value;

        let searchedItems = congregations.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) > -1
                );
            });
        });

        setLocalCongregations(searchedItems);
    };

    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Congregations
                        </h1>
                    </div>
                </header>
                <main>
                    {/* <input type="text" onChange={doSearch} /> */}
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 rounded-lg mt-3">
                        <div className="flex flex-wrap -mx-1 overflow-hidden">
                            {localCongregations.map((congregation) => (
                                <CongregationCard
                                    key={congregation.id}
                                    congregation={congregation}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

const CongregationCard = ({ congregation }) => {
    return (
        <div className="my-2 px-2 w-full  sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            {/* <div className="flex justify-center m-1  w-96"> */}
            <div className="flex flex-col md:flex-row md:max-w-xl cursor-pointer select-none rounded-lg bg-white outline-dashed shadow-md active:shadow-md hover:shadow-xl transition-all hover:scale-100 scale-95 active:scale-95">
                <div className="p-6 flex flex-col justify-start text-ellipsis overflow-hidden">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                        {congregation.name}
                    </h5>
                    <Tooltip title={congregation.address} placement={"top"}>
                        <p className="text-gray-700 text-base mb-4 truncate">
                            Address: {congregation.address}
                        </p>
                    </Tooltip>
                    <p className="text-gray-700 text-base mb-4">
                        Email: {congregation.email}
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                        Contact Number: {congregation.contact_number}
                    </p>
                    <p className="text-gray-600 text-xs">
                        Sermon added 10 minutes ago
                    </p>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default CongregationsPage;
