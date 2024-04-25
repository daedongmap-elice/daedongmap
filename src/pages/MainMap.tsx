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
  // const [mapLocation, setMapLocation] = useState<{
  //   center: {
  //     lat: number;
  //     lng: number;
  //   };
  //   isPanto: boolean;
  // }>({
  //   center: { lat: 33.450701, lng: 126.570667 },
  //   isPanto: false,
  // });
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const arr = [
    {
      place_name: "강남진해장",
      place_url: "https://place.map.kakao.com/1428481536",
      category_name: "한식",
      address_name: "서울 강남구 역삼동 819-4",
      road_address_name: "서울 강남구 테헤란로5길 11 유빌딩 1층",
      id: "1428481536",
      phone: "02-557-2662",
      x: "127.0292471",
      y: "37.4994553",
    },
    {
      place_name: "갓덴스시 강남점",
      place_url: "https://place.map.kakao.com/13575898",
      category_name: "일식",
      address_name: "서울 강남구 역삼동 822-4",
      road_address_name: "서울 강남구 테헤란로 109 강남제일빌딩 1층",
      id: "13575898",
      phone: "02-2051-1477",
      x: "127.0289786",
      y: "37.4987872",
    },
    {
      place_name: "용용선생 강남역점",
      place_url: "https://place.map.kakao.com/1336266407",
      category_name: "중식",
      address_name: "서울 강남구 역삼동 817-21",
      road_address_name: "서울 강남구 강남대로96길 17 1층",
      id: "1336266407",
      phone: "02-569-0999",
      x: "127.0284191",
      y: "37.5000464",
    },
  ];

  const handleOnClick = (position: { lat: number; lng: number }) => {
    setSelectMarker(position);
    setShowInfoCard(true);
  };

  const handleOpenModal = () => {
    setOpenListModal(() => !openListModal);
  };

  const handleClickMap = (
    _: kakao.maps.Map,
    moushEvent: kakao.maps.event.MouseEvent
  ) => {
    const latlng = moushEvent.latLng;
    setSelectMarker({ lat: latlng.getLat(), lng: latlng.getLng() });
    setShowInfoCard(false);
  };

  // const handleChangeMapLocation = () => {
  // }

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

  return (
    <Map
      center={userLocation.center}
      style={{
        width: "100%",
        height: "95.3vh",
      }}
      level={4}
      onClick={handleClickMap}
    >
      <SearchInput />
      {arr.map((place) => {
        const { id, x: lng, y: lat } = place;
        const isSelected =
          selectMarker.lat === Number(lat) && selectMarker.lng === Number(lng);

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
                <PlaceInfoCard place={place} />
              </div>
            ) : (
              <></>
            )}
          </React.Fragment>
        );
      })}

      <div
        className={`absolute right-4 z-10 transition-all duration-150 ${showInfoCard ? "bottom-60" : "bottom-16"}`}
      >
        <NowPositionBtn />
      </div>
      <PlaceListModal openListModal={openListModal} placeList={arr} />
      <div
        className={`absolute left-1/2 z-10 -translate-x-1/2 transition-all duration-150 ${showInfoCard && !openListModal ? "bottom-60" : "bottom-16"}`}
      >
        <ChangeViewBtn
          onClick={handleOpenModal}
          btnType={openListModal ? "listView" : "mapView"}
        />
      </div>
    </Map>
  );
}
