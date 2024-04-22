import { FaLocationArrow } from "react-icons/fa6";

export function PlaceInfoCard() {
  return (
    <div className="w-full h-fit flex flex-col gap-0.5 bg-white shadow rounded-lg p-2.5">
      <div className="flex gap-1.5 items-center">
        <h2 className="text-base font-bold">갓덴스시 강남점</h2>
        <p className="text-subGray text-xs ">일식</p>
      </div>
      <div className="flex gap-1.5 items-center">
        <h4 className="text-xs font-medium">4.5</h4>
        <div className="rating rating-xs rating-half pointer-events-none">
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-1"
            checked
          />
          <input
            type="radio"
            className="bg-mainY mask mask-star-2 mask-half-2"
          />
        </div>
        <p className="text-xs text-subGray">(265)</p>
      </div>
      <p className="text-xs">서울 강남구 테헤란로 109 강남제일빌딩 1층</p>
      <div className="flex gap-1">
        <p className="text-xs font-medium">0.7km</p>
        <p className="text-xs font-bold">|</p>
        <p className="text-xs text-mainG">00-0000-0000</p>
      </div>
      <div className="flex justify-between mt-0.5">
        <div className="w-[95px] h-[60px] bg-cover bg-center bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F166DC3354E4DE28425')]"></div>
        <div className="w-[95px] h-[60px] bg-cover bg-center bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fb9db7f48894e9e0b2c6d22ba7330d0f6a1aa84b5%3Foriginal')]"></div>
        <div className="w-[95px] h-[60px] bg-cover bg-center bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyNDA0MTdfMTEw%2FMDAxNzEzMzU2OTgyNTg0.R-8WU3e-khviuz6oOIK8UvI038ixpd1lwKdZMFykobMg.6uzd42BTrjFkgJPXlIMoL9xDmzXHWYtXTrxxDhwNxcMg.JPEG%2FIMG_3479.jpg%3Ftype%3Dw773')]"></div>
      </div>
      <button className="btn btn-xs w-fit bg-white border-[#258FFF] rounded-full text-xs gap-0 absolute right-2.5">
        kakao<strong>map</strong>
        <FaLocationArrow className="text-mainY" />
      </button>
    </div>
  );
}
