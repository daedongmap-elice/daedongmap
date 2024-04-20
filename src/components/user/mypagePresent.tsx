import logo from "./../../asssests/Logo.jpg";
import profile from "./../../asssests/profile.jpg";

export function MypagePresent() {
  return (
    <>
      <div className="w-full mt-[40px] flex flex-col items-center">
        <img src={logo} alt="로고 이미지" />
        <p className="absolute top-[130px] text-subLightGray">프로필 편집</p>
        <div className="avatar">
          <div className="w-24 rounded-full border-solid border  border-subGray">
            <img src={profile} alt="프로필 이미지 " />
          </div>
        </div>
        <button className="btn btn-link no-underline">사진 변경</button>
        <form>
          <div className="label">
            <span className="label-text">닉네임</span>
          </div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">자기소개</span>
          </div>
          <input
            type="text"
            placeholder="소개글을 입력해주세요."
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">웹 사이트</span>
          </div>
          <input
            type="text"
            placeholder="연동할 주소를 입력해주세요."
            className="input input-bordered w-full max-w-xs"
          />
        </form>
        <button className="btn mt-[30px] w-[280px] h-[30px] bg-mainG text-GbtnText">
          프로필 편집
        </button>
      </div>
    </>
  );
}
