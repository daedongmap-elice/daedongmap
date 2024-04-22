import { FaListUl } from "react-icons/fa";

export function ChangeViewBtn() {
  return (
    <div className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2">
      <button className="btn btn-sm rounded-full bg-white">
        <FaListUl className="h-4 w-4"></FaListUl>
        목록보기
      </button>
    </div>
  );
}
