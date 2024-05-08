import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { PlaceInfoCard, SearchInput } from "@/components/map/index";
import { PlaceData } from "@/type/types";
import React from "react";

interface FindPlaceProps {
  setPlace: React.Dispatch<
    React.SetStateAction<
      | {
          kakaoPlaceId: number;
          placeName: string;
          addressName: string;
          categoryName: string;
          roadAddressName: string;
          placeUrl: string;
          phone: string | null;
          x: number;
          y: number;
        }
      | undefined
    >
  >;
}

const FindPlaceModal: React.FC<FindPlaceProps> = ({ setPlace }) => {
  const [markers, setMarkers] = useState<PlaceData[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [selectMarker, setSelectMarker] = useState<{
    kakaoPlaceId: number;
    placeName: string;
    addressName: string;
    categoryName: string;
    roadAddressName: string;
    placeUrl: string;
    phone: string | null;
    x: number;
    y: number;
  }>();
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);

  const handleSetMarkers = (places: PlaceData[]) => {
    setMarkers(places);
  };

  const handleOnClickMarker = (place: {
    kakaoPlaceId: number;
    placeName: string;
    addressName: string;
    categoryName: string;
    roadAddressName: string;
    placeUrl: string;
    phone: string | null;
    x: number;
    y: number;
  }) => {
    setSelectMarker(place);
    setShowInfoCard(true);
  };

  const handleToggleShowInfoCard = (state: boolean) => {
    setShowInfoCard(state);
  };

  const handleResetSelectMarker = () => {
    setSelectMarker(undefined);
  };

  const handleClickMap = () => {
    handleResetSelectMarker();
    setShowInfoCard(false);
  };

  const handleSetPlace = () => {
    setPlace(selectMarker);
    // @ts-expect-error NOTE: DaisyUI의 Modal 사용을 위함
    document.getElementById("placeModal")?.close();
  };

  return (
    <>
      <div className="modal-box h-full w-full p-0">
        <div id="map" className="h-full w-full bg-slate-200">
          <Map // 지도를 표시할 Container
            id="map"
            center={{
              // 지도의 중심좌표
              lat: 37.5665851,
              lng: 126.9782038,
            }}
            style={{
              // 지도의 크기
              width: "100%",
              height: "100%",
            }}
            level={3} // 지도의 확대 레벨
            onCreate={setMap}
            onClick={handleClickMap}
          >
            <SearchInput
              map={map}
              type="post"
              handleSetMarkers={handleSetMarkers}
              handleResetSelectMarker={handleResetSelectMarker}
              handleToggleShowInfoCard={handleToggleShowInfoCard}
            />
            {markers.map((place) => {
              const { id, x: lng, y: lat } = place;
              const isSelected =
                selectMarker?.y === Number(lat) &&
                selectMarker?.x === Number(lng);

              return (
                <React.Fragment key={id}>
                  <MapMarker
                    position={{
                      lat: Number(lat),
                      lng: Number(lng),
                    }}
                    image={
                      isSelected
                        ? {
                            src: "svg/selectedMarker.svg",
                            size: {
                              width: 26,
                              height: 32,
                            },
                            options: {
                              offset: {
                                x: 13,
                                y: 32,
                              },
                            },
                          }
                        : {
                            src: "svg/marker.svg",
                            size: {
                              width: 21,
                              height: 29,
                            },
                            options: {
                              offset: {
                                x: 10.5,
                                y: 29,
                              },
                            },
                          }
                    }
                    onClick={() => handleOnClickMarker(place)}
                  />

                  {isSelected && showInfoCard && (
                    <div className="absolute bottom-8 left-1/2 z-10 w-[320px] -translate-x-1/2">
                      <PlaceInfoCard
                        place={place}
                        type="post"
                        handleSetPlace={handleSetPlace}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </Map>
        </div>
      </div>
      {/* <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form> */}
      <button
        type="button"
        className="btn btn-circle btn-ghost btn-sm absolute right-3 top-24"
        onClick={() => {
          // @ts-expect-error NOTE: DaisyUI의 Modal 사용을 위함
          document.getElementById("placeModal")?.close();
        }}
      >
        <img src="/svg/deleteIcon.svg" alt="deleteIcon" />
      </button>
    </>
  );
};

export default FindPlaceModal;
