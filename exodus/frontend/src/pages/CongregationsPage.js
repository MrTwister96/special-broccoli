/* This example requires Tailwind CSS v2.0+ */
import { useContext, useEffect } from "react";
import NavigationContext from "../context/NavigationContext";

const congregations = [
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
    {
        name: "EG Kerk Maranata",
        slug: "maranata",
        address: "389 Suider St, Pretoria North, Pretoria, 0116",
        website: "http://www.egkmaranata.co.za/",
        facebook_page: "https://facebook.com/egkmaranata/",
        email: "willieolivier@yahoo.com",
        contact_number: "+27845964578",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const CongregationsPage = () => {
    const { setLinkActive } = useContext(NavigationContext);

    useEffect(() => {
        setLinkActive("Congregations");
    }, []);

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
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 rounded-lg mt-3">
                        <div className="flex flex-wrap -mx-1 overflow-hidden">
                            {congregations.map(congregation => (
                                <CongregationCard key={congregation.id}  congregation={congregation} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

const CongregationCard = ({congregation}) => {
    return (
        <div className="my-2 px-2 w-full  sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            {/* <div className="flex justify-center m-1  w-96"> */}
                <div className="flex flex-col md:flex-row md:max-w-xl cursor-pointer select-none rounded-lg bg-white outline-dashed shadow-md active:shadow-md hover:shadow-xl transition-all hover:scale-100 scale-95 active:scale-95">
                    <div className="p-6 flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                            {congregation.name}
                        </h5>
                        {/* <p className="text-gray-700 text-base mb-4">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                        </p> */}
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
