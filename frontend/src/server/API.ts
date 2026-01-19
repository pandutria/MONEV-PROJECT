import axios from "axios"

const API = axios.create({
    baseURL: "http://100.75.216.72:8096/api"
});

export default API;
export const BASE_URL_FILE = "http://100.75.216.72:8096";