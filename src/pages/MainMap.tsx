import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  PlaceListModal,
  PlaceInfoCard,
  NowPositionBtn,
  SearchInput,
  ChangeViewBtn,
} from "@/components/map/index";
import React, { useEffect, useState } from "react";

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
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mapLocation, setMapLocation] = useState<{
    center: {
      lat: number;
      lng: number;
    };
  }>({
    center: { lat: 33.450701, lng: 126.570667 },
  });
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [markers, setMarkers] = useState<
    {
      address_name: string;
      category_name: string;
      id: string;
      phone: string;
      place_name: string;
      place_url: string;
      road_address_name: string;
      x: string;
      y: string;
    }[]
  >();

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

  const handleChangeMapLocation = (center: { lat: number; lng: number }) => {
    setMapLocation({ center });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (
            userLocation.center.lat !== position.coords.latitude &&
            userLocation.center.lng !== position.coords.longitude
          ) {
            setUserLocation((prev) => ({
              ...prev,
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              isLoading: false,
            }));
          }
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
    setMapLocation((prev) => ({
      ...prev,
      center: userLocation.center,
    }));
  }, [userLocation]);

  return (
    <Map
      center={mapLocation.center}
      style={{
        width: "100%",
        height: "95.3vh",
      }}
      level={4}
      onClick={handleClickMap}
      isPanto
      onCreate={setMap}
      onCenterChanged={(map2) =>
        handleChangeMapLocation({
          lat: map2.getCenter().getLat(),
          lng: map2.getCenter().getLng(),
        })
      }
    >
      <div className="absolute left-1/2 top-10 z-10 h-11 w-fit -translate-x-1/2">
        <SearchInput
          setMarkers={setMarkers}
          map={map}
          type="main"
          setShowInfoCard={setShowInfoCard}
        />
      </div>
      {markers === undefined ? ( //맛집이 없을 경우 메세지로 알림
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
      )}

      <div
        className={`absolute right-4 z-10 transition-all duration-150 ${showInfoCard ? "bottom-52" : "bottom-16"}`}
      >
        <NowPositionBtn
          onClickEvent={handleChangeMapLocation}
          userLocation={userLocation.center}
        />
      </div>
      <PlaceListModal
        openListModal={openListModal}
        placeList={markers}
        userLocation={userLocation}
      />
      <div
        className={`absolute left-1/2 z-10 -translate-x-1/2 transition-all duration-150 ${showInfoCard && !openListModal ? "bottom-52" : "bottom-16"}`}
      >
        <ChangeViewBtn
          onClick={handleOpenModal}
          btnType={openListModal ? "listView" : "mapView"}
        />
      </div>
    </Map>
  );
}
