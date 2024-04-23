export default function PreLoginPresent() {
  return (
    <>
      <div className="mt-[130px] flex w-full flex-col items-center justify-center">
        <a href="/">
          <img
            className="h-[290px] w-[275px]"
            src="img/LoginLogo.jpg"
            alt="로고 이미지"
          />
        </a>
        <a href="/signup">
          <button className="btn mb-[23px] h-[40px] w-[235px] bg-mainY text-YbtnText">
            회원가입
          </button>
        </a>
        <a href="/login">
          <button className="btn h-[40px] w-[235px] bg-mainG text-GbtnText">
            로그인
          </button>
        </a>
      </div>
    </>
  );
}
