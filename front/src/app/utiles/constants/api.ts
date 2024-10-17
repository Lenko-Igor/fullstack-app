import axios from 'axios'
import tokenService from '../../services/token.service'

export const API_URL = import.meta.env.VITE_APP_API_URL

export const API = axios.create({
    baseURL: API_URL,
})

API.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

API.interceptors.response.use((response) => {
    // will do somthing later
    return response
})
