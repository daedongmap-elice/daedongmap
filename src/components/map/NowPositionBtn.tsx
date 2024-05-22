import { LatLngData } from "@/type/types";
import { useEffect, useState } from "react";
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
  handleSetUserLocation: (location: {
    center?: LatLngData;
    errMsg?: null | string;
    isLoading: boolean;
  }) => void;
}

export default function NowPositionBtn({
  userLocation,
  map,
  showInfoCard,
  handleSetUserLocation,
}: NowPositionBtnProps) {
  const [isToast, setisToast] = useState<boolean>(false);

  const handleOnClick = () => {
    if (!map) {
      return null;
    }
    handleSetUserLocation({ isLoading: true });

    if (userLocation.errMsg) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleSetUserLocation({
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              errMsg: null,
              isLoading: false,
            });
          },
          (err) => {
            handleSetUserLocation({ errMsg: err.message, isLoading: false });
            setisToast(true);
          }
        );
      } else {
        handleSetUserLocation({
          errMsg: "위치를 불러올 수 없습니다.",
          isLoading: false,
        });
        setisToast(true);
      }
    }
  };

  useEffect(() => {
    if (!userLocation.isLoading && map) {
      const bounds = new kakao.maps.LatLngBounds();
      bounds.extend(
        new kakao.maps.LatLng(
          Number(userLocation.center.lat),
          Number(userLocation.center.lng)
        )
      );
      map.setBounds(bounds);
      map.setLevel(5);
    }
  }, [userLocation.isLoading]);

  return (
    <>
      <div
        className={`absolute right-5 z-10 transition-all duration-150 ${showInfoCard ? "bottom-44" : "bottom-8"}`}
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
