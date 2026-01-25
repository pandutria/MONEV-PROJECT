import axios from "axios";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjkzMTYwMzAsInNjcCI6ImFwaS12MTpyZWFkIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJzZXJ2aWNlIiwiaWF0IjoxNzY5MzE2MDMwLCJleHAiOjE3NjkzMTY5MzB9.o_cPdYy74hmaMW2RPF03WUafL5yS4z4yKSmQyDOuuVU";
const MONEV_API = axios.create({
    baseURL: "https://malutprov.lpse.info/api2/v1",
    headers: {
        Authorization: `Bearer ${key}`
    }
});

export default MONEV_API;