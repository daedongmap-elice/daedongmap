import React, { useEffect, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo } from "@/type/types";
import { DeleteUser, axiosClient, getRefreshToken } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function MyPageContainer() {
  const [profile, setProfile] = useState<UserInfo>({
    nickName: "",
    status: "",
  });
  const [isModal, setIsModal] = useState<boolean>(false);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const naviagte = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axiosClient.get(`/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        setProfile({ nickName: res.data.nickName, status: res.data.status });
        console.log(res);
      }
      if (res.status === 401) {
        getRefreshToken(refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getReview = async () => {
    try {
      const res = await axiosClient.get(`/reviews/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      const res = await axiosClient.post(`/logout`, null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });
      if (res.status === 200) {
        console.log(res);
        alert(`${res.data}`);
        localStorage.clear();
        naviagte("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(refreshToken);
    logout();
  };
  const isClickModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(isModal);
    setIsModal(!isModal);
  };
  const isClickDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsModal(!isModal);
    DeleteUser(refreshToken);
    naviagte("/");
  };
  useEffect(() => {
    getProfile();
    getReview();
  }, []);

  return (
    <MyPagePresent
      profile={profile}
      isClickLogout={isClickLogout}
      isClickModal={isClickModal}
      isModal={isModal}
      isClickDelete={isClickDelete}
    />
  );
}
