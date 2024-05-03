import { IoRefresh } from "react-icons/io5";

export default function ReSearchBtn({
  getPlaces,
}: {
  getPlaces: () => Promise<void>;
}) {
  return (
    <button
      className={
        "text btn btn-sm gap-0 rounded-full border-none bg-white font-medium shadow"
      }
      onClick={getPlaces}
    >
      이 지역 검색하기
      <IoRefresh />
    </button>
  );
}
