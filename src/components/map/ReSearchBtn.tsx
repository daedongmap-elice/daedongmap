import { IoRefresh } from "react-icons/io5";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function ReSearchBtn({ map }: { map?: kakao.maps.Map }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const nav = useNavigate();

  const handleOnClick = () => {
    if (!map) {
      return;
    }
    const center = map.getCenter();
    const latlng = `${center.getLat()},${center.getLng()}`;
    const level = map.getLevel().toString();
    if (location.pathname === "/") {
      nav(`/search?latlng=${latlng}&lvl=${level}`);
    }
    if (location.pathname === "/search") {
      searchParams.set("latlng", latlng);
      searchParams.set("lvl", level);
      setSearchParams(searchParams);
    }
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
