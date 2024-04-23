import { FaListUl } from "react-icons/fa";

export function ChangeViewBtn() {
  return (
    <button className="btn btn-sm rounded-full border-none bg-white shadow">
      <FaListUl className="h-4 w-4"></FaListUl>
      목록보기
    </button>
  );
}
