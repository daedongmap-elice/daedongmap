import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreLoginPresent from "./components/user/preLoginPresnt";
import { SignUpPresent } from "./components/user/signupPresent";
import { LoginPresent } from "./components/user/loginPresent";
import { MypagePresent } from "./components/user/mypagePresent";
import BottomNavbar from "./components/BottomNavbar";
import { MainMapPage } from "./pages/MainMapPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/prelogin" element={<PreLoginPresent />} />
          <Route path="/signup" element={<SignUpPresent />} />
          <Route path="/login" element={<LoginPresent />} />
          <Route path="mypage" element={<MypagePresent />} />
        </Routes>
      </Router>
      <MainMapPage />
      <BottomNavbar />
    </>
  );
}

export default App;
