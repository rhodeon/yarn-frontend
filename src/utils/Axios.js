import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export default Axios;