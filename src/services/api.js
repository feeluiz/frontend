import axios from 'axios'

const api = axios.create({
    baseURL: "https://backend-pic.herokuapp.com",
    timeout: 7000,
})

export default api
