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
    "product-detail": (id) => `/api/products/${id}`,

    // Review
    "reviews-product": (id) => `/api/products/${id}/reviews`,

    "cart": (userId) => `api/cart/${userId}`,

    "order": "/api/orders/my-oyrders",

    "profile": "/api/secure/profile",

    "my-store": "/api/secure/stores/my-store",

    "my-company": "/api/secure/company",

};

export const authApis = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${cookie.load('token')}`
    }
})

export default axios.create({
    baseURL: BASE_URL
});

