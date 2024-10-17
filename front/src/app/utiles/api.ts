import axios from 'axios'
import tokenService from '../services/token.service'
import { API_ENDPOINTS } from './constants/api-endpoints'

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
    return response
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = tokenService.getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}${API_ENDPOINTS.REFRESH_TOKEN}`, { refresh: refreshToken });
                    const newAccessToken = response.data.token;
                    tokenService.updateToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest); //recall Api with new token
                } catch (error) {
                    // Handle token refresh failure
                    // mostly logout the user and re-authenticate by login again
                    window.location.replace(
                        `${window.location.origin}${API_ENDPOINTS.LOGIN}`
                    )
                }
            }
        }
        return Promise.reject(error);
    })
