interface SignUpProps {
  onFormSubmit: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
}
const SignUpPresent: React.FC<SignUpProps> = ({
  onFormSubmit,
  handleChange,
  isEmail,
}) => {
  return (
    <>
      <div className="mt-[20px] flex w-full flex-col items-center">
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
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입렵해주세요."
            className="input input-bordered w-full max-w-xs"
          />
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
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="flex w-full flex-col items-center">
            <button
              type="submit"
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
