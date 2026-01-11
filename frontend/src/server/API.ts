import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:8000/api"
});

export default API;
export const BASE_URL_FILE = "http://localhost:8000";