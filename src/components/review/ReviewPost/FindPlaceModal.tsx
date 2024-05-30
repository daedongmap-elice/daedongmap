import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { PlaceInfoCard, SearchInput } from "@/components/map/index";
import { PlaceInfoData } from "@/type/types";
import React from "react";

interface FindPlaceProps {
  handleSetSelectPlace: (selectPlace: PlaceInfoData | undefined) => void;
  isShowPlaceModal: boolean;
  handleSetIsShowPlaceModal: (bool: boolean) => void;
}

const FindPlaceModal: React.FC<FindPlaceProps> = ({
  handleSetSelectPlace,
  isShowPlaceModal,
  handleSetIsShowPlaceModal,
}) => {
  const [markers, setMarkers] = useState<PlaceInfoData[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [selectMarker, setSelectMarker] = useState<PlaceInfoData>();
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const placeModalRef = useRef<HTMLDialogElement>(null);

  const handleOnClickMarker = (place: PlaceInfoData) => {
    setSelectMarker(place);
    setShowInfoCard(true);
  };

  const handleResetSelectMarker = () => {
    setSelectMarker(undefined);
  };

  const handleClickMap = () => {
    handleResetSelectMarker();
    setShowInfoCard(false);
  };

  const handleSetPlace = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleSetSelectPlace(selectMarker);
    e.stopPropagation();
    handleSetIsShowPlaceModal(false);
  };

  const handleSetText = (t: string) => {
    setText(t);
  };

  useEffect(() => {
    if (isShowPlaceModal) {
      placeModalRef.current?.showModal();
    } else {
      placeModalRef.current?.close();
    }
  }, [isShowPlaceModal]);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (text !== "") {
      try {
        ps.keywordSearch(text + " 음식점", (datas, status) => {
          if (status === kakao.maps.services.Status.ZERO_RESULT) {
            // setZeroResultToast(true);
          }
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            const newMarkers: PlaceInfoData[] = [];

            datas.map((data) => {
              const {
                address_name: addressName,
                category_name: categoryName,
                id: kakaoPlaceId,
                phone,
                place_name: placeName,
                place_url: placeUrl,
                road_address_name: roadAddressName,
                x,
                y,
              } = data;

              const categoryArr = categoryName.split(">");
              const category =
                categoryArr.length === 1
                  ? categoryArr[0].trim()
                  : categoryArr[1].trim();

              newMarkers.push({
                addressName,
                categoryName: category,
                kakaoPlaceId: Number(kakaoPlaceId),
                phone,
                placeName,
                placeUrl,
                roadAddressName,
                x: Number(x),
                y: Number(y),
              });

              bounds.extend(new kakao.maps.LatLng(Number(y), Number(x)));
            });

            setMarkers(newMarkers);
            map.setBounds(bounds);
          }
        });
      } catch (err) {
        console.log(err);
      }
      handleResetSelectMarker();
      setShowInfoCard(false);
    }
  }, [text]);

  return (
    <dialog id="placeModal" className="modal modal-bottom" ref={placeModalRef}>
      <div className="modal-box h-full w-full p-0">
        <div id="map" className="h-full w-full bg-slate-200">
          <Map // 지도를 표시할 Container
            id="reviewPostMap"
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
            <SearchInput type="post" handleSetText={handleSetText} />
            {markers.map((place) => {
              const { kakaoPlaceId, x: lng, y: lat } = place;
              const isSelected =
                selectMarker?.y === Number(lat) &&
                selectMarker?.x === Number(lng);

              return (
                <React.Fragment key={`reviewPost-${kakaoPlaceId}`}>
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
      <div className="modal-backdrop">
        <button onClick={() => handleSetIsShowPlaceModal(false)}>close</button>
      </div>
    </dialog>
  );
};

export default FindPlaceModal;
