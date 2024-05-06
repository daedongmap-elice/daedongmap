import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { SearchInput } from "@/components/map/index";

interface FindPlaceProps {
  setPlace: React.Dispatch<
    React.SetStateAction<{
      kakaoPlaceId: number;
      placeName: string;
      placeUrl: string;
      categoryName: string;
      addressName: string;
      roadAddressName: string;
      phone: string;
      x: number;
      y: number;
    }>
  >;
}

interface Marker {
  position: {
    lat: string;
    lng: string;
  };
  content: string;
}

// 인자에 { setPlace } 넣어주세요 (eslint의 defined but never used 에러 때문에 빼둠)
const FindPlaceModal: React.FC<FindPlaceProps> = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState();
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("이태원 맛집", (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = [];

        for (let i = 0; i < data.length; i++) {
          newMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-expect-error zzz
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(newMarkers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);
  return (
    <>
      <div className="modal-box h-full w-full p-0">
        <div id="map" className="h-full w-full bg-slate-200">
          <Map // 지도를 표시할 Container
            id="map"
            center={{
              // 지도의 중심좌표
              lat: 33.450701,
              lng: 126.570667,
            }}
            style={{
              // 지도의 크기
              width: "100%",
              height: "100%",
            }}
            level={3} // 지도의 확대 레벨
            onCreate={setMap}
          >
            <SearchInput />
            {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => setInfo(marker)}
              >
                {info && info.content === marker.content && (
                  <div style={{ color: "#000" }}>{marker.content}</div>
                )}
              </MapMarker>
            ))}
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