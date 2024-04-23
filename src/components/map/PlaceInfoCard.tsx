import { FaLocationArrow } from "react-icons/fa6";

export default function PlaceInfoCard() {
  return (
    <div className="flex h-fit w-full flex-col gap-0.5 rounded-lg bg-white p-2.5 shadow">
      <div className="flex items-center gap-1.5">
        <h2 className="text-base font-bold">갓덴스시 강남점</h2>
        <p className="text-xs text-subGray ">일식</p>
      </div>
      <div className="flex items-center gap-1.5">
        <h4 className="text-xs font-medium">4.5</h4>
        <div className="rating rating-half rating-xs pointer-events-none">
          <input
            type="radio"
            className="mask mask-half-1 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-2 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-1 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-2 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-1 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-2 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-1 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-2 mask-star-2 bg-mainY"
          />
          <input
            type="radio"
            className="mask mask-half-1 mask-star-2 bg-mainY"
            checked
          />
          <input
            type="radio"
            className="mask mask-half-2 mask-star-2 bg-mainY"
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
      <div className="mt-0.5 flex justify-between">
        <div className="h-[60px] w-[95px] bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F166DC3354E4DE28425')] bg-cover bg-center"></div>
        <div className="h-[60px] w-[95px] bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fb9db7f48894e9e0b2c6d22ba7330d0f6a1aa84b5%3Foriginal')] bg-cover bg-center"></div>
        <div className="h-[60px] w-[95px] bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyNDA0MTdfMTEw%2FMDAxNzEzMzU2OTgyNTg0.R-8WU3e-khviuz6oOIK8UvI038ixpd1lwKdZMFykobMg.6uzd42BTrjFkgJPXlIMoL9xDmzXHWYtXTrxxDhwNxcMg.JPEG%2FIMG_3479.jpg%3Ftype%3Dw773')] bg-cover bg-center"></div>
      </div>
      <button className="btn btn-xs absolute right-2.5 w-fit gap-0 rounded-full border-[#258FFF] bg-white text-xs">
        kakao<strong>map</strong>
        <FaLocationArrow className="text-mainY" />
      </button>
    </div>
  );
}
