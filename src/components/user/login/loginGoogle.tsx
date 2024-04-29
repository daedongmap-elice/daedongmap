import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const GoogleOauth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code: string | null = searchParams.get("code");

  useEffect(() => {
    const google = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5137/oauth/token/google/oauth?code=${code}`
        );
        console.log(res);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    if (code) {
      google();
    }
  }, [code]);
  return <div>잠시만 기다려주세요</div>;
};

export default GoogleOauth;
