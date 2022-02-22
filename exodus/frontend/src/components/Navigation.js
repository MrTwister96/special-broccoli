import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navigation = () => {
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <span> | </span>
                    <a onClick={logoutUser}>Logout</a>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </div>
    );
};

export default Navigation;
