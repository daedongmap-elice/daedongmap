import axios from "axios";
import { SignUpData } from "@/type/types";

const BASE_URL = "http://3.34.82.178:8082/api";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const signUp = async (info: SignUpData) => {
  try {
    const res = await axiosClient.post("/user/register", info);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
