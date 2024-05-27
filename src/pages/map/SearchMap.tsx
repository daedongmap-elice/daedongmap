import { Map } from "react-kakao-maps-sdk";
import {
  ChangeViewBtn,
  NowPositionBtn2,
  PlaceListModal,
} from "@/components/map/index";
import { useEffect, useState } from "react";
import { LatLngData, PlaceData } from "@/type/types";
import { useSearchParams } from "react-router-dom";
import SearchInput2 from "@/components/map/SearchInput2";

export default function SearchMap() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers] = useState<PlaceData[]>([]);
  const [filter, setFilter] = useState<string>("default");
  const [openListModal, setOpenListModal] = useState<boolean>(false);
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
    console.log(filter);
    setFilter(type);
  };

  useEffect(() => {
    if (view === "map" || view === null) {
      setOpenListModal(false);
    } else {
      setOpenListModal(true);
    }
  }, [view]);

  useEffect(() => {
    if (!map || !query) return;
    const ps = new kakao.maps.services.Places();

    try {
      ps.keywordSearch(query, (datas, status) => {
        if (status === kakao.maps.services.Status.OK) {
          map.setCenter(
            new kakao.maps.LatLng(Number(datas[0].y), Number(datas[0].x))
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [map, query]);

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
      >
        <NowPositionBtn2
          userLocation={userLocation}
          map={map}
          handleSetUserLocation={handleSetUserLocation}
        />
      </Map>
      <SearchInput2 type="main" />

      <div
        className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transition-all duration-150`}
      >
        <ChangeViewBtn
          onClick={handleChangeView}
          btnType={openListModal ? "listView" : "mapView"}
        />
      </div>
      <PlaceListModal
        openListModal={openListModal}
        placeList={markers}
        userLocation={userLocation}
        handleSetFilter={handleSetFilter}
      />
    </>
  );
}
