import axios, { AxiosError } from "axios";

const BASE_URL = "http://35.232.243.53:8080/api";

const axiosClient = axios.create({
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
      //토큰이 만료로 인한 에러
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
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.log("No response received", error.request);
    } else {
      //요청 설정 중 발생한 오류
      console.log("Error setting up request", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
