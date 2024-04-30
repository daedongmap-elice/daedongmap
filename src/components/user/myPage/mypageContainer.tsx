import { useEffect, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { UserInfo } from "@/type/types";
import { axiosClient } from "@/hooks/useAuth";

export default function MyPageContainer() {
  const [profile, setProfile] = useState<UserInfo>({
    nickName: "",
    status: "",
  });
  const getProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const res = await axiosClient.get(`/user`, { headers });
      if (res.status === 200) {
        setProfile({ nickName: res.data.nickName, status: res.data.status });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return <MyPagePresent profile={profile} />;
}
