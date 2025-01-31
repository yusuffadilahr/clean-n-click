import axios from "axios"

const instance = axios.create({
    baseURL: 'https://clean-n-click-production.up.railway.app/api'
})

export { instance }