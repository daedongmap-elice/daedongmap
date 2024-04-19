import icons from "./../../asssests/LoginLogo.jpg";

export function PreLoginPresent() {
  return (
    <>
      <div className="w-full mt-[130px] flex flex-col items-center justify-center">
        <img className="w-[275px] h-[290px]" src={icons} alt="로고 이미지" />
        <button className="btn w-[235px] h-[40px] mb-[23px] bg-mainY text-YbtnText">
          회원가입
        </button>
        <button className="btn w-[235px] h-[40px] bg-mainG text-GbtnText">
          로그인
        </button>
      </div>
    </>
  );
}
