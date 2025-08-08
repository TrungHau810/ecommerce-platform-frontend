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

    "order": "/api/orders/my-orders",

    "profile": "/api/secure/profile",


    "my-store": "/api/secure/stores/my-store",

    "my-company": "/api/secure/company",

    "stats": "/api/secure/stats-store",

    "verified-users": "/api/users/not-verified",
    "update-verified": (id) => `/api/users/${id}/is-verified`,



    //cart

    "vnpay-create": "/api/payments/vnpay/create",

    
    "vnpay-status": (orderId) => `/api/payments/vnpay/status/${orderId}`,
    "vnpay-verify": "/api/payments/vnpay/verify",
    "payments-history": "/api/payments/history",


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

