import { Map } from "react-kakao-maps-sdk";
import { NowPositionBtn2 } from "@/components/map/index";
import { useState } from "react";
import { LatLngData } from "@/type/types";

export function SearchMap() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [userLocation, setUserLocation] = useState<{
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  }>({
    center: {
      lat: 37.5665851,
      lng: 126.9782038,
    },
    errMsg: null,
    isLoading: true,
  });

  const handleSetUserLocation = (location: {
    center?: LatLngData;
    errMsg?: null | string;
    isLoading: boolean;
  }) => {
    setUserLocation((prev) => ({
      ...prev,
      ...(location.center && { center: location.center }),
      ...((location.errMsg === null || location.errMsg) && {
        errMsg: location.errMsg,
      }),
      isLoading: location.isLoading,
    }));
  };

  return (
    <>
      <div className="absolute left-1/2 top-4 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[url('img/sample3.png')] bg-cover bg-center"></div>
      <Map
        center={{
          lat: 37.5665851,
          lng: 126.9782038,
        }}
        style={{
          width: "100%",
          height: "95.3vh",
        }}
        level={6}
        isPanto
        onCreate={setMap}
      ></Map>
      {map && (
        <NowPositionBtn2
          userLocation={userLocation}
          map={map}
          handleSetUserLocation={handleSetUserLocation}
        />
      )}
    </>
  );
}
