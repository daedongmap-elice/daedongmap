import { Map, MapMarker } from "react-kakao-maps-sdk";
import selectedMarkerIcon from "../public/svg/selectedMarker.svg";
import markerIcon from "../public/svg/marker.svg";
import { ChangeViewBtn } from "../components/map/ChangeViewBtn";
import { SearchInput } from "../components/map/SearchInput";
import { NowPositionBtn } from "../components/map/NowPositionBtn";
import { PlaceInfoCard } from "../components/map/PlaceInfoCard";
import { PlaceListModal } from "@/components/map/PlaceListModal";
import { useState } from "react";

export function MainMapPage() {
  const [selectMarker, setSelectMarker] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [openListModal, setOpenListModal] = useState<boolean>(false);

  const handleOnClick = (position: { lat: number; lng: number }) => {
    setSelectMarker(position);
    setShowInfoCard(true);
  };

  const handleOpenModal = () => {
    setOpenListModal(() => !openListModal);
  };
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 37.4987872,
        lng: 127.0289786,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "95.3vh",
      }}
      level={4} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 37.4987872,
          lng: 127.0289786,
        }}
        image={
          selectMarker.lat === 37.4987872 && selectMarker.lng === 127.0289786
            ? {
                src: selectedMarkerIcon, // 마커이미지의 주소입니다
                size: {
                  width: 26,
                  height: 32,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 13,
                    y: 32,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }
            : {
                src: markerIcon, // 마커이미지의 주소입니다
                size: {
                  width: 21,
                  height: 29,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 10.5,
                    y: 29,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }
        }
        onClick={() => handleOnClick({ lat: 37.4987872, lng: 127.0289786 })}
      />
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 37.4994147,
          lng: 127.0281479,
        }}
        image={
          selectMarker.lat === 37.4994147 && selectMarker.lng === 127.0281479
            ? {
                src: selectedMarkerIcon, // 마커이미지의 주소입니다
                size: {
                  width: 26,
                  height: 32,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 13,
                    y: 32,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }
            : {
                src: markerIcon, // 마커이미지의 주소입니다
                size: {
                  width: 21,
                  height: 29,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 10.5,
                    y: 29,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }
        }
        onClick={() => handleOnClick({ lat: 37.4994147, lng: 127.0281479 })}
      />
      <SearchInput />
      <div>
        <div
          className={`absolute left-1/2 z-10 -translate-x-1/2 transition-all duration-150 ${showInfoCard ? "bottom-60" : "bottom-16"}`}
        >
          <ChangeViewBtn onClick={handleOpenModal} />
        </div>
        <div
          className={`absolute right-4 z-10 transition-all duration-150 ${showInfoCard ? "bottom-60" : "bottom-16"}`}
        >
          <NowPositionBtn />
        </div>
        {selectMarker.lat !== 0 && selectMarker.lng !== 0 ? (
          <div className="absolute bottom-16 left-1/2 z-10 w-[320px] -translate-x-1/2">
            <PlaceInfoCard />
          </div>
        ) : (
          <></>
        )}
      </div>
      {openListModal && <PlaceListModal onClick={handleOpenModal} />}
    </Map>
  );
}
