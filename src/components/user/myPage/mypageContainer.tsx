import React, { useEffect, useMemo, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo, ReviewResponse } from "@/type/types";
import {
  DeleteUser,
  getFollowing,
  getFollower,
  Logout,
  getReview,
} from "@/api/userApi";

import { useNavigate } from "react-router-dom";
import { isCheckDelete } from "@/utils/authUtils";
import { useAtom } from "jotai";
import { isTokenAtom, profileAtom } from "@/components/atom/auth";

export default function MyPageContainer() {
  const [profile] = useAtom<UserInfo>(profileAtom);
  const [isToken, setIsToken] = useAtom<boolean>(isTokenAtom);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [reviews, setReivews] = useState<ReviewResponse[]>([]);
  const [type, setType] = useState<string>("");
  const [follow, setFollow] = useState({ followers: [], followings: [] });
  const naviagte = useNavigate();

  const isClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Logout();
    setIsToken(!isToken);
    naviagte("/");
  };
  const isClickDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setType("delete");
    setIsModal(!isModal);
  };
  const isClickFollowersModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    setType("followers");
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
    getReview(setReivews);
    getFollower(setFollow);
    getFollowing(setFollow);
  }, [setReivews, setFollow]);
  console.log(follow);
  return (
    <MyPagePresent
      profile={profile}
      isClickLogout={isClickLogout}
      isClickDeleteModal={isClickDeleteModal}
      isClickFollowersModal={isClickFollowersModal}
      isModal={isModal}
      isClickDelete={isClickDelete}
      buttonDisabled={buttonDisabled}
      onClickEditButton={onClickEditButton}
      handleChange={handleChange}
      reviews={reviews}
      follow={follow}
      type={type}
    />
  );
}
