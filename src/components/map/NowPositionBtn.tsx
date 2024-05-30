import { LatLngData } from "@/type/types";
import { useEffect } from "react";
import { MdMyLocation } from "react-icons/md";

interface NowPositionBtnProps {
  userLocation: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  };
  map: kakao.maps.Map | undefined;
  handleSetUserLocation: (location: {
    center?: LatLngData;
    errMsg?: null | string;
    isLoading: boolean;
  }) => void;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function NowPositionBtn2({
  userLocation,
  map,
  handleSetUserLocation,
  setToast,
  setToastMessage,
}: NowPositionBtnProps) {
  const handleGetUserLocation = () => {
    if (!map) {
      return null;
    }

    handleSetUserLocation({ isLoading: true });
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
        }
      );
    } else {
      handleSetUserLocation({
        errMsg: "위치를 불러올 수 없습니다.",
        isLoading: false,
      });
    }
  };

  const handleOnClick = () => {
    handleGetUserLocation();
  };

  useEffect(() => {
    handleGetUserLocation();
  }, []);

  useEffect(() => {
    if (!userLocation.isLoading) {
      if (userLocation.errMsg === null) {
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(
          new kakao.maps.LatLng(
            Number(userLocation.center.lat),
            Number(userLocation.center.lng)
          )
        );
        map?.setBounds(bounds);
        map?.setLevel(7);
      } else {
        setToastMessage("위치를 가져올 수 없습니다.");
        setToast(true);
      }
    }
  }, [userLocation]);

  return (
    <>
      <button
        onClick={handleOnClick}
        className="btn btn-circle btn-sm border-none bg-white shadow"
      >
        <MdMyLocation className="h-4 w-4 text-mainG" />
      </button>
    </>
  );
}
