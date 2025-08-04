import axios from "axios";
import cookie from "react-cookies";


const BASE_URL = "http://localhost:8080/EcommercePlatformWeb/";

export const endpoints = {
    "login": "/api/login",
    "stores": "/api/stores",

};

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${cookie.load('token')}`
    }
});

