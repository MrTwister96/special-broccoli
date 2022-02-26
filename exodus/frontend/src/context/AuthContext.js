import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/useAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const localStorageAuthTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

    const [authTokens, setAuthTokens] = useState(() => localStorageAuthTokens);
    const [user, setUser] = useState(() => null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    let loginUser = async (e) => {
        e.preventDefault();
        let response = await axios.post(
            `${baseURL}/api/token/`,
            {
                username: e.target.username.value,
                password: e.target.password.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status == 200) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            history.push("/");
        } else {
            alert("Login Failed, Please Check User Creds!!");
        }
    };

    let logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/");
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
