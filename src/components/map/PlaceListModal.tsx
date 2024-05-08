import { PlaceInfoCard } from "@/components/map/index";
import { LatLngData, PlaceData } from "@/type/types";
import PerfectScrollar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { MdErrorOutline } from "react-icons/md";

interface PlaceListModalProps {
  openListModal: boolean;
  placeList: PlaceData[];
  userLocation: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  };
}

export default function PlaceListModal({
  openListModal,
  placeList,
  userLocation,
}: PlaceListModalProps) {
  return (
    <div>
      {openListModal && (
        <div className="absolute top-0 z-20 h-[5.3vh] w-full content-center bg-white">
          <img src="svg/logo.svg" alt="로고" className="mx-auto my-0 h-3/5" />
        </div>
      )}
      <div className="fixed top-0 z-10 h-24 w-full bg-[#F7F7F9]"></div>
      <div
        className={`fixed z-10 h-[95.3vh] w-full overflow-y-auto bg-[#F7F7F9] pt-24 transition-all duration-300 ${openListModal ? "top-0" : "top-[1000px]"}`}
      >
        <PerfectScrollar>
          <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3 pb-2 pt-2">
            {placeList.length === 0 ? (
              //맛집이 없는 경우 메세지로 알림 추가
              <div className="mt-40 flex flex-col items-center gap-3">
                <MdErrorOutline className="h-10 w-10 text-mainY" />
                <span className="text-sm text-subGray">
                  리뷰가 등록된 맛집이 없습니다
                </span>
              </div>
            ) : (
              placeList.map((place) => {
                return (
                  <PlaceInfoCard
                    key={place.id}
                    place={place}
                    userLocation={userLocation}
                    type="main"
                  />
                );
              })
            )}
          </div>
        </PerfectScrollar>
      </div>
    </div>
  );
}
