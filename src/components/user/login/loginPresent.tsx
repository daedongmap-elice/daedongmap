import "@/App.css";
import Naver from "./naverLogin";
import Kakao from "./kakaoLogin";
import Google from "./googleLogin";

interface LoginProps {
  onFormSubmit: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isbuttonDisabled: boolean;
}
const LoginPresent: React.FC<LoginProps> = ({
  onFormSubmit,
  handleChange,
  isbuttonDisabled,
}) => {
  return (
    <>
      <div className="mt-7 flex w-full flex-col items-center">
        <img src="img/Logo.jpg" alt="로고 이미지" />
        <form
          className="flex w-[280px] max-w-xs flex-col"
          onSubmit={onFormSubmit}
        >
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            name="email"
            type="text"
            placeholder="E-mail을 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-[280px] max-w-xs"
          />
          <div className="label">
            <span className="label-text">비밀번호</span>
          </div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-[280px] max-w-xs"
          />
          <div className="felx-col flex w-full items-center">
            <button
              type="submit"
              disabled={isbuttonDisabled}
              className="btn my-5 h-[30px] w-[280px] bg-mainG text-GbtnText"
            >
              로그인
            </button>
          </div>
        </form>
        <p className="custom-line my-2 text-center text-xs">
          소셜 계정으로 간편 로그인
        </p>
        <Naver></Naver>
        <Kakao></Kakao>
        <Google></Google>
      </div>
    </>
  );
};

export default LoginPresent;
