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
    console.log(info);
    console.log(error);
  }
};

//헤더에 accessToken 저장
// const LoginSuccess = (res: AxiosResponse) => {
//   const accessToken = res.data.token.accessToken;
//   console.log(accessToken);
//   axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// };

export const Login = async (info: LoginData) => {
  try {
    const res = await axiosClient.post("/login", info);
    if (res.status === 202) {
      localStorage.setItem("accessToken", res.data.token.accessToken);
    }
    console.log(res.data.token.accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const res = await axiosClient.get(`/user`, { headers });
    if (res.status === 200) {
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
