import axios from "axios";

export const receiptClient = axios.create({
    baseURL: "http://localhost:50050/api/v1/",
    timeout: 1000,
});

export const gptClient = axios.create({
    baseURL: "http://localhost:50054/api/v1/",
    timeout: 1000,
});