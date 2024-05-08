import "@/App.css";
import Naver from "./naverLogin";
import Kakao from "./kakaoLogin";
import Google from "./googleLogin";

interface LoginProps {
  onFormSubmit: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isbuttonDisabled: boolean;
  isClickFindId: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isModal: boolean;
  handleChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getId: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  findButtonDisabled: boolean;
}
const LoginPresent: React.FC<LoginProps> = ({
  onFormSubmit,
  handleChange,
  isbuttonDisabled,
  isClickFindId,
  isModal,
  handleChangePhone,
  getId,
  findButtonDisabled,
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
              className="btn my-3 h-[30px] w-[280px] bg-mainG text-GbtnText"
            >
              로그인
            </button>
          </div>
        </form>
        <div className="w-[280px] text-right text-xs text-subGray">
          <button onClick={isClickFindId}>아이디 찾기</button>
        </div>
        {isModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                  onClick={isClickFindId}
                >
                  ✕
                </button>
              </form>
              <h3 className="text-bg-error my-2 text-center text-lg font-bold">
                아이디 찾기
              </h3>
              <div className="label">
                <span className="label-text font-semibold">
                  휴대폰번호로 찾기
                </span>
              </div>
              <input
                type="text"
                name="message"
                placeholder="휴대폰번호를 입력해주세요."
                onChange={handleChangePhone}
                className="input input-sm input-bordered w-full max-w-xs"
              />
              <button
                className="btn btn-sm mt-[30px] w-[280px] bg-mainG text-GbtnText"
                disabled={findButtonDisabled}
                onClick={getId}
              >
                아이디 찾기
              </button>
            </div>
          </div>
        )}
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
