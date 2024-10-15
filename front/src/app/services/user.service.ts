import { API } from '../global/api'
import { API_ENDPOINTS } from '../utiles/constants/api-endpoints'

type ApiResponse<T> = T
type TUser = {
    id: string
    name: string
    email: string
}

const getUsers = async (): Promise<TUser[]> => {
    const response = await API.get<ApiResponse<TUser[]>>(
        API_ENDPOINTS.GET_USERS,
    )

    return response.data
}

export default {
    getUsers,
}
