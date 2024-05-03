import axios from "axios";

export const transactionClient = axios.create({
    baseURL: "http://localhost:50052/api/v1/",
    timeout: 1000,
});
