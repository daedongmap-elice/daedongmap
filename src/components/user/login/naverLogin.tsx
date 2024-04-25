const Naver = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_CALLBACK_URL;
  const STATE = Math.random();
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_CALLBACK_URL}&state=${STATE}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <button onClick={NaverLogin}>
      <img
        className="mt-4 w-60"
        src="img/btnG_official.png"
        alt="네이버 로그인"
      />
    </button>
  );
};

export default Naver;
