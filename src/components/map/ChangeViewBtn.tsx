import { FaListUl } from "react-icons/fa";

interface ChangeViewBtnProps {
  onClick: () => void;
}

export function ChangeViewBtn({ onClick }: ChangeViewBtnProps) {
  return (
    <button
      className="btn btn-sm rounded-full border-none bg-white shadow"
      onClick={onClick}
    >
      <FaListUl className="h-4 w-4"></FaListUl>
      목록보기
    </button>
  );
}
