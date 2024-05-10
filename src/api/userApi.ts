import { SignUpRequest, LoginData } from "@/type/types";
import axiosClient from "@/utils/baseUrl";

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
