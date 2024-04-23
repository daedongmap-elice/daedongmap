import { FaListUl } from "react-icons/fa";

export function ChangeViewBtn() {
  return (
    <button className="btn btn-sm absolute bottom-10 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white">
      <FaListUl className="h-4 w-4">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </FaListUl>
      목록보기
    </button>
  );
}
