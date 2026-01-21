import axios from "axios";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Njg5ODY0MjcsInNjcCI6ImFwaS12MTpyZWFkIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJzZXJ2aWNlIiwiaWF0IjoxNzY4OTg2NDI3LCJleHAiOjE3Njg5ODczMjd9.2Zw15KKCbCE2Nyrl5dgtg3ABubfREFTH_Nn3z9lPLGA";
const MONEV_API = axios.create({
    baseURL: "https://malutprov.lpse.info/api2/v1",
    headers: {
        Authorization: `Bearer ${key}`
    }
});

export default MONEV_API;