const Kakao = () => {
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_CALLBACK_URL = import.meta.env.VITE_KAKAO_CALLBACK_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_CALLBACK_URL}&response_type=code`;

  const KakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={KakaoLogin}>
      <img className="mt-4 w-60" src="img/kakaoLogin.png" alt="카카오 로그인" />
    </button>
  );
};

export default Kakao;
