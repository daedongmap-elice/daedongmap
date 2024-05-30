import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  PlaceListModal,
  PlaceInfoCard,
  ChangeViewBtn,
  NowPositionBtn,
  ReSearchBtn,
} from "@/components/map/index";
import React, { useEffect, useState } from "react";
import { LatLngData, PlaceData } from "@/type/types";
import Toast from "@/components/common/Toast";
import axiosClient from "@/utils/baseUrl";
import { useSearchParams } from "react-router-dom";
import SearchInput2 from "@/components/map/SearchInput2";

export default function MainMap() {
  const [map, setMap] = useState<kakao.maps.Map>();
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
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [isLoadingMarker, setIsLoadingMarker] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [nowCenter, setNowCenter] = useState<LatLngData>();
  const [searchLocation, setSearchLocation] = useState<LatLngData>();
  const [markers, setMarkers] = useState<PlaceData[]>([]);
  const [filter, setFilter] = useState<string>("default");

  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");

  const handleOnClickMarker = (position: { lat: number; lng: number }) => {
    setSelectMarker(position);
    setShowInfoCard(true);
  };

  const handleResetSelectMarker = () => {
    setSelectMarker({ lat: 0, lng: 0 });
    setShowInfoCard(false);
  };

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

  const handleOnCenterChanged = (mapInfo: kakao.maps.Map) => {
    const latlng = mapInfo.getCenter();

    setNowCenter({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
  };

  const handleSetFilter = (type: string) => {
    setFilter(type);
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
      const latlng = map.getCenter();
      setNowCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
      setSearchLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
      handleResetSelectMarker();
      handleSetFilter("default");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSetUserLocation({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
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
  }, []);

  useEffect(() => {
    if (view === "map" || view === null) {
      setOpenListModal(false);
    } else {
      setOpenListModal(true);
    }
  }, [view]);

  useEffect(() => {
    getPlaces();
  }, [userLocation.center]);

  useEffect(() => {
    if (filter !== "default") {
      getPlaces();
    }
  }, [filter]);

  return (
    <>
      <>
        <div className="absolute left-1/2 top-4 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[url('img/sample3.png')] bg-cover bg-center"></div>
        <Map
          center={
            userLocation.errMsg === null
              ? userLocation.center
              : {
                  lat: 37.5665851,
                  lng: 126.9782038,
                }
          }
          style={{
            width: "100%",
            height: "95.3vh",
          }}
          level={7}
          onClick={handleResetSelectMarker}
          isPanto
          onCreate={setMap}
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
                      <div className="absolute bottom-16 left-1/2 z-10 w-[320px] -translate-x-1/2">
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
            <NowPositionBtn
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
                <ReSearchBtn map={map} />
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
    </>
  );
}
