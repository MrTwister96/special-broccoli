import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    let { user, loginUser } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <Redirect to="/" />
            ) : (
                <form onSubmit={loginUser}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                    />
                    <input type="submit" />
                </form>
            )}
        </div>
    );
};

export default LoginPage;
