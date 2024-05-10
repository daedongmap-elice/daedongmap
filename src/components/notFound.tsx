import { Link } from "react-router-dom";

export default function NotFoundPresent() {
  return (
    <>
      <div className="mt-24 flex flex-col items-center">
        <img src="img/logo.png" alt="로고 이미지" />
        <span className="mb-[40px] text-2xl font-semibold text-[#DE0E0E]">
          존재하지 않는 페이지입니다.
        </span>
        <Link to="/">
          <button className="btn h-[40px] w-[235px] bg-mainG text-GbtnText">
            홈으로 이동
          </button>
        </Link>
      </div>
    </>
  );
}
