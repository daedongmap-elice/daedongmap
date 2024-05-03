import axios from "axios";
import { SignUpRequest, LoginData } from "@/type/types";

const BASE_URL = "http://35.232.243.53:8080/api";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const signUp = async (info: SignUpRequest) => {
  try {
    const res = await axiosClient.post("/register", info);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// const LoginSuccess = (res: AxiosResponse) => {
//   const accessToken = res.data.token.accessToken;
//   console.log(accessToken);
//   axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// };

export const Login = async (info: LoginData) => {
  try {
    const res = await axiosClient.post("/login", info);
    if (res.status === 202) {
      //LoginSuccess(res);
      localStorage.setItem("accessToken", res.data.token.accessToken);
      localStorage.setItem("refreshToken", res.data.token.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getRefreshToken = async (RT: string | null) => {
  try {
    const res = await axiosClient.get(`/refresh-token`, {
      headers: { Authorization: `Bearer ${RT}` },
    });
    if (res.status === 200) {
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (RT: string | null) => {
  try {
    const res = await axiosClient.post(`/logout`, {
      headers: { Authorization: `Bearer ${RT}` },
    });
    if (res.status === 200) {
      console.log(res);
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
  }
};
