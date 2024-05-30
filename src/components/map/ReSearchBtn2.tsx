import { IoRefresh } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

export default function ReSearchBtn2({ map }: { map?: kakao.maps.Map }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOnClick = () => {
    if (!map) {
      return;
    }
    const center = map.getCenter();
    const latlng = `${center.getLat()},${center.getLng()}`;
    searchParams.set("latlng", latlng);
    searchParams.set("lvl", map.getLevel().toString());
    setSearchParams(searchParams);
  };
  return (
    <button
      className={
        "text btn btn-sm gap-0 rounded-full border-none bg-white font-medium shadow"
      }
      onClick={handleOnClick}
    >
      이 지역 검색하기
      <IoRefresh />
    </button>
  );
}
