import axios from "axios"

const Axios = axios.create({
    baseURL: 'http://192.168.43.236:8000/',
    timeout: 1000,
    headers: {
        Authorization: localStorage.getItem("token")
    }
})

export default Axios