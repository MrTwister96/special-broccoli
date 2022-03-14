import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// export const baseURL = "http://192.168.0.208:8000";
export const baseURL = "https://api.egklank.co.za";
// export const baseAppURL = "http://192.168.0.208:3000";
export const baseAppURL = "https://new.egklank.co.za";

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`,
        },
    });

    axiosInstance.interceptors.request.use(async (request) => {
        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return request;

        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh,
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));

        request.headers.Authorization = `Bearer ${response.data.access}`;

        return request;
    });

    return axiosInstance;
};

export default useAxios;
