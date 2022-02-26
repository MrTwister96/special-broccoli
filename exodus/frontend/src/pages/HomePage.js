/* This example requires Tailwind CSS v2.0+ */
import { useContext, useEffect } from "react";
import NavigationContext from "../context/NavigationContext";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const HomePage = () => {
    const { setLinkActive } = useContext(NavigationContext);

    useEffect(() => {
        setLinkActive("Home");
    }, []);

    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Home
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </>
    );
};

export default HomePage;
