import axios from "axios";

const MONEV_API = axios.create({
    baseURL: "https://malutprov.lpse.info/api2/v1",
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Njg4OTcxMzQsInNjcCI6ImFwaS12MTpyZWFkIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJzZXJ2aWNlIiwiaWF0IjoxNzY4ODk3MTM0LCJleHAiOjE3Njg4OTgwMzR9.s14Q3ZeWIO5ELfAyh_ZISoj2y3WDhJSfEIzYS0Zl4eM"
    }
});

export default MONEV_API;