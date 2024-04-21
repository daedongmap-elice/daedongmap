import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreLoginPresent from "./components/user/preLoginPresnt";
import { SignUpPresent } from "./components/user/signupPresent";
import { LoginPresent } from "./components/user/loginPresent";
import { MypagePresent } from "./components/user/mypagePresent";
import { MainMapPage } from "./pages/MainMapPage";
import BottomNavbar from "./components/BottomNavbar";
import ReviewGallery from "./pages/review/ReviewGallery";
import ReviewPost from "./pages/review/ReviewPost";
import ReviewDetail from "./pages/review/ReviewDetail";
import ReviewComment from "./pages/review/ReviewComment";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainMapPage />} />
          <Route path="/prelogin" element={<PreLoginPresent />} />
          <Route path="/signup" element={<SignUpPresent />} />
          <Route path="/login" element={<LoginPresent />} />
          <Route path="/mypage" element={<MypagePresent />} />
          <Route path="/review" element={<ReviewGallery />} />
          <Route path="/post" element={<ReviewPost />} />
          <Route path="/detail" element={<ReviewDetail />} />
          <Route path="/comment" element={<ReviewComment />} />
        </Routes>
      </Router>
      <BottomNavbar />
    </>
  );
}

export default App;
