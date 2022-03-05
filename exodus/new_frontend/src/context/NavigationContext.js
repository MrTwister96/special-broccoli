import { createContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [navLinks, setNavLinks] = useState([
        { name: "Home", label: "Tuis", to: "/", active: false },
        {
            name: "Congregations",
            label: "Gemeentes",
            to: "/gemeentes",
            active: false,
        },
    ]);

    let setLinkActive = (pageName) => {
        let tempNavLinks = [...navLinks];

        tempNavLinks.forEach((navLink) => {
            if (navLink.name === pageName) {
                navLink.active = true;
            } else {
                navLink.active = false;
            }
            return;
        });

        setNavLinks(tempNavLinks);
    };

    let setAllLinksInactive = () => {
        let tempNavLinks = [...navLinks];

        tempNavLinks.forEach((navLink) => {
            navLink.active = false;
        });

        setNavLinks(tempNavLinks);
    };

    let contextData = {
        navLinks: navLinks,
        setLinkActive: setLinkActive,
        setAllLinksInactive: setAllLinksInactive,
    };

    return (
        <NavigationContext.Provider value={contextData}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;
