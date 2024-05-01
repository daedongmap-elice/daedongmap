import { useEffect, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo } from "@/type/types";
import { axiosClient } from "@/hooks/useAuth";

export default function MyPageContainer() {
  const [profile, setProfile] = useState<UserInfo>({
    nickName: "",
    status: "",
  });
  const accessToken = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${accessToken}` };
  const getProfile = async () => {
    try {
      const res = await axiosClient.get(`/user`, { headers });
      if (res.status === 200) {
        setProfile({ nickName: res.data.nickName, status: res.data.status });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getReview = async () => {
    try {
      const res = await axiosClient.get(`/reviews/users/me`, { headers });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
    getReview();
  }, []);

  return <MyPagePresent profile={profile} />;
}
