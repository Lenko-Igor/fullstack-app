import { TUser } from '../global/types'
import { API } from '../utiles/api'
import { API_ENDPOINTS } from '../utiles/constants/api-endpoints'

type ApiResponse<T> = T

const getUsers = async (): Promise<TUser[]> => {
    const response = await API.get<ApiResponse<TUser[]>>(
        API_ENDPOINTS.GET_USERS,
    )

    return response.data
}

const getCurrentUser = async (): Promise<TUser> => {
    const response = await API.get<ApiResponse<TUser>>(
        API_ENDPOINTS.GET_CURRENT_USER,
    )

    return response.data
}

const updateUser = async (userId: string, data: FormData): Promise<TUser> => {
    const response = await API.patch<ApiResponse<TUser>>(
        API_ENDPOINTS.UPDATE_USER_BY_ID(userId),
        data,
    )

    return response.data
}

export default {
    getUsers,
    getCurrentUser,
    updateUser,
}
