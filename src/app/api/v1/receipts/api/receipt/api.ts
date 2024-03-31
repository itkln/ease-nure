import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:50050/api/v1/",
    timeout: 1000,
});