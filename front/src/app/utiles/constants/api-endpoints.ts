export const API_ENDPOINTS = {
    GET_USERS: '/users',
    GET_CURRENT_USER: '/users/current',
    UPDATE_USER_BY_ID: (userId: string) => `/users/update/${userId}`,
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH_TOKEN: '/auth/refresh',
}
