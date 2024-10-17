import Cookies from "js-cookie";
import { TokensData } from "../global/types";

const setTokens = ({ token, refreshToken }: TokensData) => {
  Cookies.set("token", token, { expires: 1 });
  Cookies.set("refreshToken", refreshToken);
};

const getAccessToken = () => {
  return Cookies.get("token");
};

const deleteTokens = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};

export default {
  setTokens,
  getAccessToken,
  deleteTokens,
};
