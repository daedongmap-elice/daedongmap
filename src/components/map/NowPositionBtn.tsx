import { MdMyLocation } from "react-icons/md";

interface NowPositionBtnProps {
  onClickEvent: (center: { lat: number; lng: number }) => void;
  userLocation: {
    lat: number;
    lng: number;
  };
}

export default function NowPositionBtn({
  onClickEvent,
  userLocation,
}: NowPositionBtnProps) {
  return (
    <button
      onClick={() => onClickEvent(userLocation)}
      className="btn btn-circle btn-sm border-none bg-white shadow"
    >
      <MdMyLocation className="h-4 w-4 text-mainG" />
    </button>
  );
}
