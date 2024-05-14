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
  const [isToken, setIsToken] = useAtom<boolean>(isTokenAtom);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [reviews, setReivews] = useState<ReviewResponse[]>([]);
  const naviagte = useNavigate();
  const getProfile = async () => {
    try {
      const { status, data } = await axiosClient.get(`/user`);
      if (status === 200) {
        setProfile({
          profileImage: data.profileImage,
          nickName: data.nickName,
          status: data.status,
          webSite: data.webSite,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getReview = async () => {
    try {
      const { status, data } = await axiosClient.get(`/reviews/users/me`);
      if (status === 200) {
        setReivews(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      const { status, data } = await axiosClient.post(`/user/logout`);
      if (status === 200) {
        alert(`${data}`);
        localStorage.clear();
        setIsToken(!isToken);
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
    setIsToken(!isToken);
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
