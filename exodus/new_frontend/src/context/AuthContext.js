import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../hooks/useAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const localStorageAuthTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

    const [authTokens, setAuthTokens] = useState(() => localStorageAuthTokens);
    const [user, setUser] = useState(() => null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    let loginUser = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            let response = await axios.post(
                `${baseURL}/api/token/`,
                {
                    username: data.get("username"),
                    password: data.get("password"),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.access));
                localStorage.setItem(
                    "authTokens",
                    JSON.stringify(response.data)
                );
                return { status: true };
            }
        } catch (error) {
            return { status: false, message: error.response.data.detail };
        }
    };

    let logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    let contextData = {
        user: user,
        authTokens: authTokens,
        setUser: setUser,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
