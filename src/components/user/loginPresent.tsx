import logo from "./../../asssests/Logo.jpg";
import "./../../App.css";

export function LoginPresent() {
  return (
    <>
      <div className="w-full mt-[70px] flex flex-col items-center">
        <img src={logo} alt="로고 이미지" />
        <form className="w-[280px] flex flex-col max-w-xs">
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
        <button className="btn mt-[30px] w-[280px] h-[30px] bg-mainG text-GbtnText">
          회원가입
        </button>
        <p className="text-center text-xs custom-line mt-[15px]">
          소셜 계정으로 간편 로그인
        </p>
      </div>
    </>
  );
}
