import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuth = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  useEffect(() => {
    const naver = async () => {
      try {
        const res = await axios.get(
          `http://3.34.82.178:8082/user/login?code=${code}&state=${state}`
        );
        const authorizationHeader = res.headers.authorization;
        localStorage.setItem("Token", authorizationHeader);
        navigate("/");
      } catch (error) {
        console.error("Error fetching OAuth token:", error);
      }
    };

    if (code) {
      naver();
    }
  }, [code]);
  return <div>조금만 기다려주세요.</div>;
};

export default OAuth;
