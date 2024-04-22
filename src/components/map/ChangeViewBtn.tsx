import { FaListUl } from "react-icons/fa";

export function ChangeViewBtn() {
  return (
    <button className="btn btn-sm rounded-full bg-white z-10 absolute bottom-16 left-1/2 -translate-x-1/2">
      <FaListUl className="h-4 w-4"></FaListUl>
      목록보기
    </button>
  );
}
