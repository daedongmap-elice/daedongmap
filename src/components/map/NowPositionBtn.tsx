import { MdMyLocation } from "react-icons/md";

interface NowPositionBtnProps {
  userLocation: {
    lat: number;
    lng: number;
  };
  map: kakao.maps.Map | undefined;
}

export default function NowPositionBtn({
  userLocation,
  map,
}: NowPositionBtnProps) {
  const handleOnClick = () => {
    if (!map) {
      return null;
    }
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(Number(userLocation.lat), Number(userLocation.lng))
    );
    map.setBounds(bounds);
    map.setLevel(4);
  };
  return (
    <button
      onClick={handleOnClick}
      className="btn btn-circle btn-sm border-none bg-white shadow"
    >
      <MdMyLocation className="h-4 w-4 text-mainG" />
    </button>
  );
}
