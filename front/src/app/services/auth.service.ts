import { LoginProps, SignUpProps } from "../global/types";
import { API } from "../utiles/api";
import { API_ENDPOINTS } from "../utiles/constants/api-endpoints";

type ApiResponse<T> = T;

export type LoginResponse = {
    userId: number;
    token: string;
    refreshToken: string;
};

const login = async (data: LoginProps): Promise<LoginResponse> => {
    const response = await API.post<ApiResponse<LoginResponse>>(
        API_ENDPOINTS.LOGIN,
        data,
    );

    return response.data;
};

const signup = async (data: SignUpProps): Promise<LoginResponse> => {
    const response = await API.post<ApiResponse<LoginResponse>>(
        API_ENDPOINTS.SIGNUP,
        data,
    );

    return response.data;
};

export default {
    login,
    signup,
};
