import axios from "axios";
import { SignUpData } from "@/type/types";

const BASE_URL = "http://localhost:5000/api";

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
