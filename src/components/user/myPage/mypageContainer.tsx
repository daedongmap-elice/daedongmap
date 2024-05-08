import React, { useEffect, useMemo, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo } from "@/type/types";
import { DeleteUser, axiosClient } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { isCheckDelete } from "@/utils/authUtils";

export default function MyPageContainer() {
  const [profile, setProfile] = useState<UserInfo>({
    profileImage: "",
    nickName: "",
    status: "",
  });
  const [isModal, setIsModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [reviews, setReivews] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const naviagte = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axiosClient.get(`/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        setProfile({
          profileImage: res.data.profileImage,
          nickName: res.data.nickName,
          status: res.data.status,
        });
        console.log(res);
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
        setReivews(res.data);
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
    DeleteUser(accessToken);
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
