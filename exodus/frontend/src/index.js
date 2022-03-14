import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import { AuthProvider } from "./context/AuthContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StoreProvider } from "./context/StoreContext";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <NavigationProvider>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </NavigationProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
