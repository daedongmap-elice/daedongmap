import icons from "./../../assests/LoginLogo.jpg";

export default function PreLoginPresent() {
  return (
    <>
      <div className="w-full mt-[130px] flex flex-col items-center justify-center">
        <a href="/">
          <img className="w-[275px] h-[290px]" src={icons} alt="로고 이미지" />
        </a>
        <a href="/signup">
          <button className="btn w-[235px] h-[40px] mb-[23px] bg-mainY text-YbtnText">
            회원가입
          </button>
        </a>
        <a href="/login">
          <button className="btn w-[235px] h-[40px] bg-mainG text-GbtnText">
            로그인
          </button>
        </a>
      </div>
    </>
  );
}
