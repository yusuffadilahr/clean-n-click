import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL
const instance = axios.create({
    baseURL: baseURL
})

export { instance }