const Google = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const CALLBACK_URL = import.meta.env.VITE_GOOGLE_CALLBACK_URL;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${API_KEY}&scope=openid%20profile%20email&redirect_uri=${CALLBACK_URL}`;

  const GoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <button onClick={GoogleLogin}>
      <img
        className="mt-4 w-60"
        src="img/googleLogin.png"
        alt="카카오 로그인"
      />
    </button>
  );
};

export default Google;
