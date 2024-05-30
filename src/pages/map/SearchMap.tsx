import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  ChangeViewBtn,
  NowPositionBtn2,
  PlaceInfoCard,
  PlaceListModal,
} from "@/components/map/index";
import { useEffect, useState } from "react";
import { LatLngData, PlaceData } from "@/type/types";
import { useSearchParams } from "react-router-dom";
import SearchInput2 from "@/components/map/SearchInput2";
import axiosClient from "@/utils/baseUrl";
import React from "react";
import ReSearchBtn2 from "@/components/map/ReSearchBtn2";
import Toast from "@/components/common/Toast";

export default function SearchMap() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<PlaceData[]>([]);
  const [filter, setFilter] = useState<string>("default");
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [isLoadingMarker, setIsLoadingMarker] = useState<boolean>(false);
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [nowCenter, setNowCenter] = useState<LatLngData>();
  const [searchLocation, setSearchLocation] = useState<LatLngData>();
  const [selectMarker, setSelectMarker] = useState<LatLngData>();
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
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const view = searchParams.get("view");
  const searchLatLng = searchParams.get("latlng");
  const level = searchParams.get("lvl");

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

  const handleChangeView = () => {
    if (view === "map" || view === null) {
      searchParams.set("view", "list");
    }
    if (view === "list") {
      searchParams.set("view", "map");
    }

    setSearchParams(searchParams);
  };

  const handleSetFilter = (type: string) => {
    setFilter(type);
  };

  const handleResetSelectMarker = () => {
    setSelectMarker({ lat: 0, lng: 0 });
    setShowInfoCard(false);
  };

  const handleOnClickMarker = (position: { lat: number; lng: number }) => {
    setSelectMarker(position);
    setShowInfoCard(true);
  };

  const handleOnCenterChanged = (mapInfo: kakao.maps.Map) => {
    const latlng = mapInfo.getCenter();

    setNowCenter({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
  };

  async function getPlaces() {
    if (!map) {
      return;
    }
    setIsLoadingMarker(true);
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    try {
      const res = await axiosClient.get(
        `/place/region?x1=${swLatLng.getLng()}&x2=${neLatLng.getLng()}&y1=${swLatLng.getLat()}&y2=${neLatLng.getLat()}&x=${userLocation.center.lng}&y=${userLocation.center.lat}${filter !== "default" && filter !== "recommend" ? `&filter=${filter}` : ""}`
      );
      const data = await res.data;
      if (res.status === 200) {
        if (data.length === 0) {
          setToastMessage("해당 지역에는 리뷰가 등록된 맛집이 없습니다.");
          setToast(true);
          setMarkers([]);
        } else {
          const placeArr: PlaceData[] = [];

          data.map((place: PlaceData) => placeArr.push(place));
          setMarkers(placeArr);
        }
      }
      setIsLoadingMarker(false);
      handleResetSelectMarker();
      const latlng = map.getCenter();
      setNowCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
      setSearchLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
      handleSetFilter("default");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (filter !== "default") {
      getPlaces();
    }
  }, [filter]);

  useEffect(() => {
    if (view === "map" || view === null) {
      setOpenListModal(false);
    } else {
      setOpenListModal(true);
    }
  }, [view]);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (searchLatLng) {
      const [lat, lng] = searchLatLng.split(",");
      if (level) {
        map.setLevel(Number(level));
      }

      map.setCenter(new kakao.maps.LatLng(Number(lat), Number(lng)));
      getPlaces();
    } else {
      try {
        if (query) {
          ps.keywordSearch(query, (datas, status) => {
            if (status === kakao.maps.services.Status.ZERO_RESULT) {
              setToastMessage(`"${query}"(으)로 검색한 결과가 없습니다.`);
              setToast(true);
            }
            if (status === kakao.maps.services.Status.OK) {
              map.setCenter(
                new kakao.maps.LatLng(Number(datas[0].y), Number(datas[0].x))
              );
              getPlaces();
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [map, query, searchLatLng]);

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
        level={7}
        isPanto
        onCreate={setMap}
        onClick={handleResetSelectMarker}
        onCenterChanged={handleOnCenterChanged}
      >
        {!isLoadingMarker &&
          (markers === undefined ? ( //맛집이 없을 경우 메세지로 알림
            <></>
          ) : (
            markers.map((place) => {
              const { id, x: lng, y: lat } = place;
              const isSelected =
                selectMarker?.lat === Number(lat) &&
                selectMarker?.lng === Number(lng);
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
                    onClick={() =>
                      handleOnClickMarker({
                        lat: Number(lat),
                        lng: Number(lng),
                      })
                    }
                  />

                  {isSelected && showInfoCard && (
                    <div className="absolute bottom-8 left-1/2 z-10 w-[320px] -translate-x-1/2">
                      <PlaceInfoCard
                        place={place}
                        userLocation={userLocation}
                        type="main"
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })
          ))}
        <div
          className={`absolute right-5 z-10 transition-all duration-150 ${showInfoCard ? "bottom-44" : "bottom-8"}`}
        >
          <NowPositionBtn2
            userLocation={userLocation}
            map={map}
            handleSetUserLocation={handleSetUserLocation}
            setToast={setToast}
            setToastMessage={setToastMessage}
          />
        </div>
        <div
          className={`absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-150 ${showInfoCard && !openListModal ? "bottom-44" : "bottom-8"}`}
        >
          <ChangeViewBtn
            onClick={handleChangeView}
            btnType={openListModal ? "listView" : "mapView"}
          />
        </div>
        {nowCenter?.lat !== searchLocation?.lat &&
          nowCenter?.lng !== searchLocation?.lng &&
          !isLoadingMarker &&
          !openListModal && (
            <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2">
              <ReSearchBtn2 map={map} />
            </div>
          )}
      </Map>
      <SearchInput2 type="main" />

      <PlaceListModal
        openListModal={openListModal}
        placeList={markers}
        userLocation={userLocation}
        handleSetFilter={handleSetFilter}
      />
      {toast && <Toast setToast={setToast} message={toastMessage} />}
    </>
  );
}
