import { useEffect, useState } from "react";
import MyPagePresent from "./mypagePresent";
import { ReviewResponse, UserInfo } from "@/type/types";
import { Follow, axiosClient } from "@/hooks/useAuth";

export default function UserPageContainer() {
  const [userProfile, setUserProfile] = useState<UserInfo>({
    profileImage: "",
    nickName: "",
    status: "",
  });

  const accessToken = localStorage.getItem("accessToken");
  const [reviews, setReivews] = useState<ReviewResponse[]>([]);
  const id: string = location.hash.substring(1);

  const getUserProfile = async () => {
    try {
      const res = await axiosClient.get(`/user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        setUserProfile({
          profileImage: res.data.profileImage,
          nickName: res.data.nickName,
          status: res.data.status,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserReviews = async () => {
    try {
      const res = await axiosClient.get(`/reviews/users/${id}`);
      if (res.status === 200) {
        setReivews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isClickFollow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Follow(id);
  };

  useEffect(() => {
    getUserProfile();
    getUserReviews();
  }, []);
  return (
    <MyPagePresent
      profile={userProfile}
      reviews={reviews}
      userId={id}
      isClickFollow={isClickFollow}
    />
  );
}
