import axios from "axios";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Njk2NzM4OTMsInNjcCI6ImFwaS12MTpyZWFkIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJzZXJ2aWNlIiwiaWF0IjoxNzY5NjczODkzLCJleHAiOjE3Njk2NzQ3OTN9.Ps5jGQrk2iLOftdb_Db8tqELluzCStKqS_iS3vlF0JY";
const MONEV_API = axios.create({
    baseURL: "https://malutprov.lpse.info/api2/v1",
    headers: {
        Authorization: `Bearer ${key}`
    }
});

export default MONEV_API;