import { LatLngData } from "@/type/types";
import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import Toast from "../common/Toast";

interface NowPositionBtnProps {
  userLocation: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
    isSetUserLocation: boolean;
  };
  map: kakao.maps.Map | undefined;
  showInfoCard: boolean;
}

export default function NowPositionBtn({
  userLocation,
  map,
  showInfoCard,
}: NowPositionBtnProps) {
  const [toast, setToast] = useState<boolean>(false);

  const handleOnClick = () => {
    if (!map) {
      return null;
    }

    if (!userLocation.isSetUserLocation) {
      setToast(true);
      return;
    }

    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(
        Number(userLocation.center.lat),
        Number(userLocation.center.lng)
      )
    );
    map.setBounds(bounds);
    map.setLevel(5);
  };
  return (
    <>
      <div
        className={`absolute right-4 z-10 transition-all duration-150 ${showInfoCard ? "bottom-52" : "bottom-16"}`}
      >
        <button
          onClick={handleOnClick}
          className="btn btn-circle btn-sm border-none bg-white shadow"
        >
          <MdMyLocation className="h-4 w-4 text-mainG" />
        </button>
      </div>
      {toast && (
        <Toast setToast={setToast} message="위치를 가져올 수 없습니다." />
      )}
    </>
  );
}
