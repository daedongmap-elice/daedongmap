import logo from "./../../asssests/Logo.jpg";
export function SignUpPresent() {
  return (
    <>
      <div className="w-full mt-[70px] flex flex-col items-center">
        <img className="w-[300px] h-[129px]" src={logo} alt="로고 이미지" />
        <form className="w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="text"
            placeholder="E-mail을 입력해주세요."
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">비밀번호</span>
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
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
            <span className="label-text">닉네임</span>
          </div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="input input-bordered w-full max-w-xs"
          />
        </form>
        <button className="btn mt-[30px] w-[280px] h-[30px] bg-mainG text-GbtnText">
          회원가입
        </button>
      </div>
    </>
  );
}
