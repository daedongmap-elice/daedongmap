import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PreLoginPresent } from "./components/user/preLoginPresnt";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/prelogin" element={<PreLoginPresent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
