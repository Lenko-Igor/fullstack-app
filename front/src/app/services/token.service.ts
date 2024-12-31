import Cookies from "js-cookie";
import { TokensData } from "../global/types";

const setTokens = ({ token, refreshToken }: TokensData) => {
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("refreshToken", refreshToken);
};

const getAccessToken = () => {
    return Cookies.get("token");
};

const getRefreshToken = () => {
    return Cookies.get("refreshToken");
};

const deleteTokens = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
};

const updateToken = (token: string) => {
    Cookies.set("token", token, { expires: 1 });
}

export default {
    setTokens,
    getAccessToken,
    getRefreshToken,
    deleteTokens,
    updateToken,
};
