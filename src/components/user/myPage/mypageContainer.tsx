import { useEffect, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo } from "@/type/types";
import { Logout, axiosClient, getRefreshToken } from "@/hooks/useAuth";

export default function MyPageContainer() {
  const [profile, setProfile] = useState<UserInfo>({
    nickName: "",
    status: "",
  });
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

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
        headers: { Authorization: `Bearer: ${accessToken}` },
      });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Logout(refreshToken);
  };
  useEffect(() => {
    getProfile();
    getReview();
  }, []);

  return <MyPagePresent profile={profile} isClickLogout={isClickLogout} />;
}
