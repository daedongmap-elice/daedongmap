import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code: string | null = searchParams.get("code");

  useEffect(() => {
    console.log(code);
    const kakao = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5137/oauth/token/kakao/oauth?code=${code}`
        );
        console.log(res);
        navigate("/");
      } catch (error) {
        console.error("Error fetching OAuth token:", error);
      }
    };

    if (code) {
      kakao();
    }
  }, [code]);
  return <div>조금만 기다려주세요.</div>;
};

export default KakaoOauth;
