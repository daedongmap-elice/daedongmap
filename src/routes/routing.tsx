import { Routes, createBrowserRouter, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { MainMap } from "../pages/MainMap";
import ReviewGallery from "../pages/review/ReviewGallery";
import ReviewPost from "../pages/review/ReviewPost";
import ReviewDetail from "../pages/review/ReviewDetail";
import ReviewFeed from "@/pages/review/ReviewFeed";
import ReviewEdit from "@/pages/review/ReviewEdit";
import PreLogin from "../components/user/preLoginPresnt";
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
      { path: "/detail/:reviewId", element: <ReviewDetail /> },
      { path: "/feed/:placeId", element: <ReviewFeed /> },
      { path: "/edit/:reviewId", element: <ReviewEdit /> },
      //유저 관련 페이지
      { path: "/signup", element: <SignUpContainer /> },
      { path: "/login", element: <LoginContainer /> },
      { path: "/naver/oauth", element: <NaverOAuth /> },
      { path: "/kakao/oauth", element: <KakaoOauth /> },
      { path: "/google/oauth", element: <GoogleOauth /> },
      {
        path: "/*",
        element: (
          <PreLogin>
            <Routes>
              <Route path="/post" element={<ReviewPost />} />
              <Route path="/edit" element={<ReviewEdit />} />
              <Route path="/mypage" element={<MyPageContainer />} />
              <Route path="/userpage" element={<UserPageContainer />} />
              <Route path="/editprofile" element={<EditProfileContainer />} />
            </Routes>
          </PreLogin>
        ),
      },
    ],
  },
]);

export default router;
