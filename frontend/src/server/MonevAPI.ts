import axios from "axios";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjkwNTMxNjAsInNjcCI6ImFwaS12MTpyZWFkIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJzZXJ2aWNlIiwiaWF0IjoxNzY5MDUzMTYwLCJleHAiOjE3NjkwNTQwNjB9.5flvRD8HUace8cQnFW-_V-4Ssrcac_cY0q9bIGy9kuo";
const MONEV_API = axios.create({
    baseURL: "https://malutprov.lpse.info/api2/v1",
    headers: {
        Authorization: `Bearer ${key}`
    }
});

export default MONEV_API;