import axios from "axios"

const API = axios.create({
    baseURL: "http://10.30.21.58:8096/api"
});

export default API;
export const BASE_URL_FILE = "http://10.30.21.58:8096";