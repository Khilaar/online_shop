import axios from "axios"

const api = axios.create({
    baseURL: "https://motion.propulsion-home.ch/backend/api",
})

export default api