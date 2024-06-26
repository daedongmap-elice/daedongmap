interface SignUpProps {
  onFormSubmit: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  isPassword: boolean;
  buttonDisabled: boolean;
  pwLength: number;
}
const SignUpPresent: React.FC<SignUpProps> = ({
  onFormSubmit,
  handleChange,
  isEmail,
  isPassword,
  buttonDisabled,
  pwLength,
}) => {
  return (
    <>
      <div className="mt-[20px] flex w-full flex-col items-center pb-16">
        <img src="img/Logo.jpg" alt="로고 이미지" />
        <form className="w-full max-w-xs" onSubmit={onFormSubmit}>
          <div className="label">
            <span className="label-text">E-mail</span>
            {isEmail ? (
              <></>
            ) : (
              <span className="label-text-alt text-[#EA1C1C]">
                잘못된 Email 형식입니다.
              </span>
            )}
          </div>
          {isEmail ? (
            <input
              type="text"
              name="email"
              placeholder="E-mail을 입력해주세요."
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          ) : (
            <input
              type="text"
              name="email"
              placeholder="E-mail을 입력해주세요."
              onChange={handleChange}
              className="input input-bordered input-error w-full max-w-xs"
            />
          )}

          <div className="label">
            <span className="label-text">비밀번호</span>
            {pwLength == 0 ? (
              <span className="label-text-alt text-[#EA1C1C]">
                비밀번호는 필수 정보입니다.
              </span>
            ) : pwLength < 8 ? (
              <span className="label-text-alt text-[#EA1C1C]">
                비밀번호 8자 이상 입력해주세요.
              </span>
            ) : (
              <></>
            )}
          </div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">비밀번호 확인</span>
            {isPassword ? (
              <></>
            ) : (
              <span className="label-text-alt text-[#EA1C1C]">
                비밀번호가 일치하지 않습니다.
              </span>
            )}
          </div>
          {isPassword ? (
            <input
              type="password"
              name="checkPassword"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          ) : (
            <input
              type="password"
              name="checkPassword"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
              className="input input-bordered input-error w-full max-w-xs"
            />
          )}

          <div className="label">
            <span className="label-text">전화번호</span>
          </div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="전화번호를 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">닉네임</span>
          </div>
          <input
            type="text"
            name="nickName"
            placeholder="닉네임을 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="flex w-full items-center">
            <button
              type="submit"
              disabled={buttonDisabled}
              className="btn mx-auto mt-[30px] h-[30px] w-[280px] bg-mainG text-GbtnText"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPresent;
