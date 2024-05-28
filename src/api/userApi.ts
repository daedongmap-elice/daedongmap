import {
  SignUpRequest,
  LoginData,
  UserInfo,
  ReviewResponse,
} from "@/type/types";
import axiosClient from "@/utils/baseUrl";

export const signUp = async (info: SignUpRequest) => {
  try {
    const res = await axiosClient.post("/register", info);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (info: LoginData) => {
  try {
    const res = await axiosClient.post("/login", info);
    if (res.status === 202) {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      return {
        success: true,
        id: res.data.userId,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      id: 0,
    };
  }
};

export const Logout = async () => {
  try {
    const { status, data } = await axiosClient.post(`/user/logout`);
    if (status === 200) {
      alert(`${data}`);
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
  }
};
export const DeleteUser = async () => {
  try {
    const res = await axiosClient.delete(`/user`);
    if (res.status === 200) {
      alert("회원이 탈퇴되었습니다.");
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
  }
};

export const FindEmail = async (phoneNumber: string) => {
  try {
    const res = await axiosClient.post(`/accountId`, { phoneNumber });
    if (res.status === 200) {
      console.log(res.data);
      alert(`찾으신 아이디는 ${res.data} 입니다.`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const Follow = async (userId: string) => {
  try {
    await axiosClient.post(`/follows/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

export const UnFollow = async (userId: string) => {
  try {
    await axiosClient.delete(`/follows/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getFollowing = async (setFollow: any) => {
  try {
    const { status, data } = await axiosClient.get(`/follows/following`);
    if (status === 200) {
      setFollow((prev: any) => ({ ...prev, followings: data }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFollower = async (setFollow: any) => {
  try {
    const { status, data } = await axiosClient.get(`/follows/follower`);
    if (status === 200) {
      setFollow((prev: any) => ({ ...prev, followers: data }));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async (setProfile: (profile: UserInfo) => void) => {
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

export const getReview = async (
  setReviews: (reviews: ReviewResponse[]) => void
) => {
  try {
    const { status, data } = await axiosClient.get(`/reviews/users/me`);
    if (status === 200) {
      setReviews(data);
    }
  } catch (error) {
    console.log(error);
  }
};
