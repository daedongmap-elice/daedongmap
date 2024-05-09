import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { MainMap } from "../pages/MainMap";
import ReviewGallery from "../pages/review/ReviewGallery";
import ReviewPost from "../pages/review/ReviewPost";
import ReviewDetail from "../pages/review/ReviewDetail";
import ReviewFeed from "@/pages/review/ReviewFeed";
import ReviewEdit from "@/pages/review/ReviewEdit";
import PreLoginPresent from "../components/user/preLoginPresnt";
import MyPageContainer from "@/components/user/myPage/mypageContainer";
import UserPageContainer from "@/components/user/myPage/userPageContainer";
import EditProfileContainer from "@/components/user/myPage/editProfileContainer";
import NotFoundPresent from "../components/notFound";
import SignUpContainer from "@/components/user/signUP/signupContainer";
import LoginContainer from "@/components/user/login/loginContainer";
import KakaoOauth from "@/components/user/login/loginKakao";
import NaverOAuth from "@/components/user/login/loginNaver";
import GoogleOauth from "@/components/user/login/loginGoogle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPresent />,
    children: [
      { path: "/", element: <MainMap /> },
      //게시글 관련 페이지
      { path: "/review", element: <ReviewGallery /> },
      { path: "/detail", element: <ReviewDetail /> },
      { path: "/post", element: <ReviewPost /> },
      { path: "/edit", element: <ReviewEdit /> },
      { path: "/feed", element: <ReviewFeed /> },
      //유저 관련 페이지
      { path: "/prelogin", element: <PreLoginPresent /> },
      { path: "/signup", element: <SignUpContainer /> },
      { path: "/login", element: <LoginContainer /> },
      { path: "/naver/oauth", element: <NaverOAuth /> },
      { path: "/kakao/oauth", element: <KakaoOauth /> },
      { path: "/google/oauth", element: <GoogleOauth /> },
      { path: "/mypage", element: <MyPageContainer /> },
      { path: `/userpage`, element: <UserPageContainer /> },
      { path: "/editprofile", element: <EditProfileContainer /> },
    ],
  },
]);

export default router;
