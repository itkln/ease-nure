import axios from "axios";

export const llmClient = axios.create({
    baseURL: "http://localhost:50054/api/v1/",
    timeout: 1000,
});