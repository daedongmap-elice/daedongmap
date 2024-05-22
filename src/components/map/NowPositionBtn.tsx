import { LatLngData } from "@/type/types";
import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import Toast from "../common/Toast";

interface NowPositionBtnProps {
  userLocation: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  };
  map: kakao.maps.Map | undefined;
  showInfoCard: boolean;
  setUserLocation: React.Dispatch<
    React.SetStateAction<{
      center: LatLngData;
      errMsg: null | string;
      isLoading: boolean;
    }>
  >;
}

export default function NowPositionBtn({
  userLocation,
  map,
  showInfoCard,
  setUserLocation,
}: NowPositionBtnProps) {
  const [isToast, setisToast] = useState<boolean>(false);

  const handleOnClick = () => {
    if (!map) {
      return null;
    }

    if (userLocation.errMsg) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation((prev) => ({
              ...prev,
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              errMsg: null,
              isLoading: false,
            }));
          },
          (err) => {
            setUserLocation((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
            setisToast(true);
          }
        );
      } else {
        setUserLocation((prev) => ({
          ...prev,
          errMsg: "위치를 불러올 수 없습니다.",
          isLoading: false,
        }));
        setisToast(true);
      }
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
        className={`absolute right-5 z-10 transition-all duration-150 ${showInfoCard ? "bottom-52" : "bottom-16"}`}
      >
        <button
          onClick={handleOnClick}
          className="btn btn-circle btn-sm border-none bg-white shadow"
        >
          <MdMyLocation className="h-4 w-4 text-mainG" />
        </button>
      </div>
      {isToast && (
        <Toast setToast={setisToast} message="위치를 가져올 수 없습니다." />
      )}
    </>
  );
}
