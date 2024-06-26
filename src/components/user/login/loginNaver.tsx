import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { isTokenAtom } from "@/components/atom/auth";
import { useAtom } from "jotai";

const NaverOAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isToken, setIsToken] = useAtom(isTokenAtom);
  const code: string | null = searchParams.get("code");
  const state: string | null = searchParams.get("state");

  console.log(code, state);

  useEffect(() => {
    const naver = async () => {
      try {
        const res = await axios.get(
          `http://35.232.243.53:8080/login/oauth2/naver`,
          {
            params: {
              code: code,
            },
          }
        );
        if (res.status === 202) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          setIsToken(!isToken);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching OAuth token:", error);
      }
    };

    if (code) {
      naver();
    }
  }, [code]);
  return (
    <div className="my-72 flex w-full flex-col items-center justify-center">
      <span className="loading loading-dots loading-lg"></span>
      <h2>로그인 중입니다. 잠시간 기다려주세요.</h2>
    </div>
  );
};

export default NaverOAuth;
