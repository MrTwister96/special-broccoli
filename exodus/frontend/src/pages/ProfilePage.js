import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

import useAxios from "../utils/useAxios";

const ProfilePage = () => {
    let { user } = useContext(AuthContext);
    const [congregations, setCongregations] = useState([])

    const api = useAxios()

    useEffect(() => {
        getCongregations()
    }, [])

    const getCongregations = async () => {
        let response = await api.get('/api/congregations/')

        if (response.status == 200) {
            setCongregations(response.data)
            console.log("Congregations: ", response.data)
        }
    }

    return (
        <div>
            <h1>Hello {user.username}!</h1>
            <ul>
                
            {congregations.map(congregation => (
                <li key={congregation.id}>{congregation.name}</li>
            ))}
            </ul>
        </div>
    );
};

export default ProfilePage;
