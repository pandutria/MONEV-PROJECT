import axios from "axios";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjkwMzEwMjgsInNjcCI6ImFwaS12MTpyZWFkIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJzZXJ2aWNlIiwiaWF0IjoxNzY5MDMxMDI4LCJleHAiOjE3NjkwMzE5Mjh9.7V2vlEaNKStNE6z2_NuNVVgFcJxpuF3jIeJCTDy4JLw";
const MONEV_API = axios.create({
    baseURL: "https://malutprov.lpse.info/api2/v1",
    headers: {
        Authorization: `Bearer ${key}`
    }
});

export default MONEV_API;