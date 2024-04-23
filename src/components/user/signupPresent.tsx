interface SignUpProps {
  onFormSubmit: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SignUpPresent: React.FC<SignUpProps> = ({
  onFormSubmit,
  handleChange,
}) => {
  return (
    <>
      <div className="w-full mt-[30px] flex flex-col items-center">
        <img src="img/Logo.jpg" alt="로고 이미지" />
        <form className="w-full max-w-xs" onSubmit={onFormSubmit}>
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="E-mail을 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
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
          <div className="w-full flex flex-col items-center">
            <button
              type="submit"
              className="btn mt-[30px] w-[280px] h-[30px] bg-mainG text-GbtnText mx-auto"
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
