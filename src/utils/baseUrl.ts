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

export default axiosClient;
