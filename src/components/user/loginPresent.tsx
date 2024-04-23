import "./../../App.css";

export default function LoginPresent() {
  return (
    <>
      <div className="mt-[70px] flex w-full flex-col items-center">
        <img src="img/Logo.jpg" alt="로고 이미지" />
        <form className="flex w-[280px] max-w-xs flex-col">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="text"
            placeholder="E-mail을 입력해주세요."
            className="input input-bordered w-[280px] max-w-xs"
          />
          <div className="label">
            <span className="label-text">비밀번호</span>
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="input input-bordered w-[280px] max-w-xs"
          />
        </form>
        <a href="/">
          <button className="btn mt-[30px] h-[30px] w-[280px] bg-mainG text-GbtnText">
            로그인
          </button>
        </a>
        <p className="custom-line mt-[15px] text-center text-xs">
          소셜 계정으로 간편 로그인
        </p>
      </div>
    </>
  );
}
