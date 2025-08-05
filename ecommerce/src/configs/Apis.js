import axios from "axios";
import cookie from "react-cookies";


const BASE_URL = "http://localhost:8080/EcommercePlatformWeb/";

export const endpoints = {
    "login": "/api/login",
    "register": "/api/users",

    "categories": "/api/categories",
    "stores": "/api/stores",
    "stores-detail": (id) => `/api/stores/${id}`,
    "products-store": (id) => `/api/stores/${id}/products`,
    "products": "api/products",

    "profile": "/api/secure/profile",

};

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${cookie.load('token')}`
    }
});

