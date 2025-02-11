import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8090/api/v1"
});

export default API; 
