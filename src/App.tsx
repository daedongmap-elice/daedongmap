import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreLoginPresent from "./components/user/preLoginPresnt";
import { SignUpPresent } from "./components/user/signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/prelogin" element={<PreLoginPresent />} />
          <Route path="signup" element={<SignUpPresent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
