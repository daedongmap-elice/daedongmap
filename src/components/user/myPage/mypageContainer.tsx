import React, { useEffect, useMemo, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo, ReviewResponse } from "@/type/types";
import { DeleteUser } from "@/api/userApi";
import axiosClient from "@/utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { isCheckDelete } from "@/utils/authUtils";
import { useAtom } from "jotai";
import { isTokenAtom, profileAtom } from "@/components/atom/auth";

export default function MyPageContainer() {
  const [profile, setProfile] = useAtom<UserInfo>(profileAtom);
  const [isToken, setIsTokn] = useAtom<boolean>(isTokenAtom);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [reviews, setReivews] = useState<ReviewResponse[]>([]);
  const naviagte = useNavigate();
  const getProfile = async () => {
    try {
      const res = await axiosClient.get(`/user`);
      if (res.status === 200) {
        setProfile({
          profileImage: res.data.profileImage,
          nickName: res.data.nickName,
          status: res.data.status,
          webSite: res.data.webSite,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getReview = async () => {
    try {
      const res = await axiosClient.get(`/reviews/users/me`);
      if (res.status === 200) {
        setReivews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      const res = await axiosClient.post(`/user/logout`);
      if (res.status === 200) {
        alert(`${res.data}`);
        localStorage.clear();
        setIsTokn(!isToken);
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
    logout();
  };
  const isClickModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };
  const isClickDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsModal(!isModal);
    DeleteUser();
    setIsTokn(!isToken);
    naviagte("/");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const buttonDisabled = useMemo(() => {
    return !isCheckDelete(message);
  }, [message]);
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
      buttonDisabled={buttonDisabled}
      handleChange={handleChange}
      reviews={reviews}
    />
  );
}
