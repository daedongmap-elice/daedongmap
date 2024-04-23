import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { MainMapPage } from "../pages/MainMapPage";
import ReviewGallery from "../pages/review/ReviewGallery";
import ReviewPost from "../pages/review/ReviewPost";
import ReviewDetail from "../pages/review/ReviewDetail";
import ReviewComment from "../pages/review/ReviewComment";
import ReviewFeed from "@/pages/review/ReviewFeed";
import ReviewEdit from "@/pages/review/ReviewEdit";
import PreLoginPresent from "../components/user/preLoginPresnt";
//import SignUpPresent from "../components/user/signupPresent";
import LoginPresent from "../components/user/loginPresent";
import MyPagePresent from "../components/user/mypagePresent";
import EditProfilePresnet from "../components/user/editProfilePresent";
import NotFoundPresent from "../components/notFound";
import SignUpContainer from "@/components/user/signupContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPresent />,
    children: [
      { path: "/", element: <MainMapPage /> },
      //게시글 관련 페이지
      { path: "/review", element: <ReviewGallery /> },
      { path: "/detail", element: <ReviewDetail /> },
      { path: "/comment", element: <ReviewComment /> },
      { path: "/post", element: <ReviewPost /> },
      { path: "/edit", element: <ReviewEdit /> },
      { path: "/feed", element: <ReviewFeed /> },
      //유저 관련 페이지
      { path: "/prelogin", element: <PreLoginPresent /> },
      { path: "/signup", element: <SignUpContainer /> },
      { path: "/login", element: <LoginPresent /> },
      { path: "/mypage", element: <MyPagePresent /> },
      { path: "/editprofile", element: <EditProfilePresnet /> },
    ],
  },
]);

export default router;
