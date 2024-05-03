import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code: string | null = searchParams.get("code");

  useEffect(() => {
    const kakao = async () => {
      try {
        const res = await axios.get(
          `http://35.232.243.53:8080/login/oauth2/kakao`,
          {
            params: {
              code: code,
            },
          }
        );
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
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
