import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  PlaceListModal,
  PlaceInfoCard,
  NowPositionBtn,
  SearchInput,
  ChangeViewBtn,
  ReSearchBtn,
} from "@/components/map/index";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MainMap() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [selectMarker, setSelectMarker] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState<{
    center: {
      lat: number;
      lng: number;
    };
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
  const [nowCenter, setNowCenter] = useState<{
    lat: number;
    lng: number;
  }>();
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const [markers, setMarkers] = useState<
    {
      addressName: string;
      averageRating: number;
      categoryName: string;
      id: number;
      kakaoPlaceId: number;
      phone: string | null;
      placeName: string;
      placeUrl: string;
      roadAddressName: string;
      x: number;
      y: number;
    }[]
  >([]);

  const handleOnClick = (position: { lat: number; lng: number }) => {
    setSelectMarker(position);
    setShowInfoCard(true);
  };

  const handleOpenModal = () => {
    setOpenListModal((prev) => !prev);
  };

  const handleClickMap = (
    _: kakao.maps.Map,
    moushEvent: kakao.maps.event.MouseEvent
  ) => {
    const latlng = moushEvent.latLng;
    setSelectMarker({ lat: latlng.getLat(), lng: latlng.getLng() });
    setShowInfoCard(false);
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
    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest();
    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();
    try {
      const res = await axios.get(
        `http://35.232.243.53:8080/api/place/region?x1=${swLatLng.getLng()}&x2=${neLatLng.getLng()}&y1=${swLatLng.getLat()}&y2=${neLatLng.getLat()}`
      );
      const data = await res.data;
      if (res.status === 200) {
        const placeArr: {
          addressName: string;
          averageRating: number;
          categoryName: string;
          id: number;
          kakaoPlaceId: number;
          phone: string | null;
          placeName: string;
          placeUrl: string;
          roadAddressName: string;
          x: number;
          y: number;
        }[] = [];

        data.map(
          (place: {
            addressName: string;
            averageRating: number;
            categoryName: string;
            id: number;
            kakaoPlaceId: number;
            phone: string | null;
            placeName: string;
            placeUrl: string;
            roadAddressName: string;
            x: number;
            y: number;
          }) => placeArr.push(place)
        );
        setMarkers(placeArr);
      }

      setIsLoadingMarker(false);
      const latlng = map.getCenter();
      setNowCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
      setSearchLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setUserLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setUserLocation((prev) => ({
        ...prev,
        errMsg: "위치를 불러올 수 없습니다.",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    getPlaces();
  }, [userLocation]);

  return (
    <Map
      center={userLocation.center}
      style={{
        width: "100%",
        height: "95.3vh",
      }}
      level={4}
      onClick={handleClickMap}
      isPanto
      onCreate={setMap}
      onCenterChanged={handleOnCenterChanged}
    >
      <SearchInput
        map={map}
        type="main"
        setShowInfoCard={setShowInfoCard}
        getPlaces={getPlaces}
      />
      {!isLoadingMarker &&
        (markers === undefined ? ( //맛집이 없을 경우 메세지로 알림
          <></>
        ) : (
          markers.map((place) => {
            const { id, x: lng, y: lat } = place;
            const isSelected =
              selectMarker.lat === Number(lat) &&
              selectMarker.lng === Number(lng);
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
                    handleOnClick({ lat: Number(lat), lng: Number(lng) })
                  }
                />

                {isSelected ? (
                  <div className="absolute bottom-16 left-1/2 z-10 w-[320px] -translate-x-1/2">
                    <PlaceInfoCard
                      place={place}
                      userLocation={userLocation}
                      type="main"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </React.Fragment>
            );
          })
        ))}

      <div
        className={`absolute right-4 z-10 transition-all duration-150 ${showInfoCard ? "bottom-52" : "bottom-16"}`}
      >
        <NowPositionBtn userLocation={userLocation.center} map={map} />
      </div>
      {openListModal && (
        <PlaceListModal
          openListModal={openListModal}
          placeList={markers}
          userLocation={userLocation}
        />
      )}

      <div
        className={`absolute left-1/2 z-10 -translate-x-1/2 transition-all duration-150 ${showInfoCard && !openListModal ? "bottom-52" : "bottom-16"}`}
      >
        <ChangeViewBtn
          onClick={handleOpenModal}
          btnType={openListModal ? "listView" : "mapView"}
        />
      </div>
      {nowCenter?.lat !== searchLocation?.lat &&
        nowCenter?.lng !== searchLocation?.lng &&
        !isLoadingMarker &&
        !openListModal && (
          <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2">
            <ReSearchBtn getPlaces={getPlaces} />
          </div>
        )}
    </Map>
  );
}
