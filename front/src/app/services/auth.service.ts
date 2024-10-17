import { LoginProps, SignUpProps } from '../global/types'
import { API } from '../utiles/constants/api'
import { API_ENDPOINTS } from '../utiles/constants/api-endpoints'

type ApiResponse<T> = T

const login = async (data: LoginProps): Promise<{ token: string }> => {
    const response = await API.post<ApiResponse<{ token: string }>>(
        API_ENDPOINTS.LOGIN,
        data,
    )

    return response.data
}

const signup = async (data: SignUpProps): Promise<{ token: string }> => {
    const response = await API.post<ApiResponse<{ token: string }>>(
        API_ENDPOINTS.SIGNUP,
        data,
    )

    return response.data
}

export default {
    login,
    signup,
}