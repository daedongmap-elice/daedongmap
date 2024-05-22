import React, { useEffect, useMemo, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo, ReviewResponse } from "@/type/types";
import { DeleteUser, Logout, getProfile, getReview } from "@/api/userApi";
import { useNavigate } from "react-router-dom";
import { isCheckDelete } from "@/utils/authUtils";
import { useAtom } from "jotai";
import { isTokenAtom, profileAtom } from "@/components/atom/auth";

export default function MyPageContainer() {
  const [profile, setprofile] = useAtom<UserInfo>(profileAtom);
  const [isToken, setIsToken] = useAtom<boolean>(isTokenAtom);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [reviews, setReivews] = useState<ReviewResponse[]>([]);
  const naviagte = useNavigate();
  const isClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Logout();
    setIsToken(!isToken);
    naviagte("/");
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
  const onClickEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    naviagte("/editprofile");
  };
  const buttonDisabled = useMemo(() => {
    return !isCheckDelete(message);
  }, [message]);
  useEffect(() => {
    getProfile(setprofile);
    getReview(setReivews);
  }, [setprofile, setReivews]);

  return (
    <MyPagePresent
      profile={profile}
      isClickLogout={isClickLogout}
      isClickModal={isClickModal}
      isModal={isModal}
      isClickDelete={isClickDelete}
      buttonDisabled={buttonDisabled}
      onClickEditButton={onClickEditButton}
      handleChange={handleChange}
      reviews={reviews}
    />
  );
}
