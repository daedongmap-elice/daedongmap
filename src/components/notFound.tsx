export default function NotFoundPresent() {
  return (
    <>
      <div className="mt-[100px] flex flex-col items-center">
        <img src="img/LoginLogi.jpg" alt="로고 이미지" />
        <span className="mb-[40px] text-2xl font-semibold text-[#DE0E0E]">
          존재하지 않는 페이지입니다.
        </span>
        <a href="/">
          <button className="btn h-[40px] w-[235px] bg-mainG text-GbtnText">
            홈으로 이동
          </button>
        </a>
      </div>
    </>
  );
}
