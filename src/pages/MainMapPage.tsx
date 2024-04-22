import { Map, MapMarker } from "react-kakao-maps-sdk";
import selectedMarkerIcon from "../public/svg/selectedMarker.svg";
import markerIcon from "../public/svg/marker.svg";
import { ChangeViewBtn } from "../components/map/ChangeViewBtn";
import { SearchInput } from "../components/map/SearchInput";
import { NowPositionBtn } from "../components/map/NowPositionBtn";

export function MainMapPage() {
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 37.54699,
        lng: 127.09598,
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
          lat: 37.54699,
          lng: 127.09598,
        }}
        image={{
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
        }}
      />
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 37.544,
          lng: 127.094,
        }}
        image={{
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
        }}
      />
      <SearchInput />
      <div>
        <ChangeViewBtn />
        <NowPositionBtn />
      </div>
    </Map>
  );
}
