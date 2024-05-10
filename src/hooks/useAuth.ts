import axios, { AxiosError } from "axios";
import { SignUpRequest, LoginData } from "@/type/types";

const BASE_URL = "http://35.232.243.53:8080/api";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError) => {
    const { response, config } = error;
    if (response?.status === 401 && config) {
      localStorage.removeItem("accessToken");
      const RT = localStorage.getItem("refreshToken");
      if (RT) {
        try {
          const res = await axiosClient.get(`/refresh-token`, {
            headers: { Authorization: `Bearer ${RT}` },
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          axiosClient.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
          if (config?.headers) {
            config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          }
          return await axiosClient(config);
        } catch (err) {
          window.location.href = "/login";
          console.log(err);
        }
      }
    }
    return Promise.reject(error);
  }
);
export const signUp = async (info: SignUpRequest) => {
  try {
    const res = await axiosClient.post("/register", info);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (info: LoginData) => {
  try {
    const res = await axiosClient.post("/login", info);
    if (res.status === 202) {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const DeleteUser = async () => {
  try {
    const res = await axiosClient.delete(`/user`);
    if (res.status === 200) {
      alert("회원이 탈퇴되었습니다.");
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
  }
};

export const FindEmail = async (phoneNumber: string) => {
  try {
    const res = await axiosClient.post(`/accountId`, { phoneNumber });
    if (res.status === 200) {
      console.log(res.data);
      alert(`찾으신 아이디는 ${res.data} 입니다.`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const Follow = async (userId: string) => {
  try {
    await axiosClient.post(`/follows/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

export const UnFollow = async (userId: string) => {
  try {
    await axiosClient.delete(`/follows/${userId}`);
  } catch (error) {
    console.log(error);
  }
};
