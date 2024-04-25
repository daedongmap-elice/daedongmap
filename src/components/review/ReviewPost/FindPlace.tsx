import { SearchInput } from "@/components/map/SearchInput";
// import { useState } from "react";

export default function FindPlace() {
  // const [info, setInfo] = useState();
  // const [markers, setMarkers] = useState([]);
  // const [map, setMap] = useState();

  // const mapContainer = document.getElementById("map");
  // const mapOption = {
  //   center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
  //   level: 3, // 지도의 확대 레벨
  // };

  // 지도를 생성합니다
  // const map = new kakao.maps.Map(mapContainer, mapOption);

  // 장소 검색 객체를 생성합니다
  // const ps = new kakao.maps.services.Places();

  // 키워드로 장소를 검색합니다
  // ps.keywordSearch("이태원 맛집", placesSearchCB);

  return (
    <>
      <div className="modal-box h-full w-full p-0">
        <div id="map" className="h-full w-full bg-slate-200">
          <SearchInput />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}
