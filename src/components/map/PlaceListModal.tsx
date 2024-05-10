import { PlaceInfoCard } from "@/components/map/index";
import { LatLngData, PlaceData } from "@/type/types";
import PerfectScrollar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { MdErrorOutline } from "react-icons/md";
import { Select } from "../review";

interface PlaceListModalProps {
  openListModal: boolean;
  placeList: PlaceData[];
  userLocation: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
    isSetUserLocation: boolean;
  };
  handleSetFilter: (type: string) => void;
}

export default function PlaceListModal({
  openListModal,
  placeList,
  userLocation,
  handleSetFilter,
}: PlaceListModalProps) {
  return (
    <div>
      <div
        className={`fixed z-10 h-[95.3vh] w-full bg-[#F7F7F9] transition-all duration-300 ${openListModal ? "top-0" : "top-[1000px]"}`}
      >
        <PerfectScrollar>
          <div
            className={`fixed left-1/2 -translate-x-1/2 transition-all duration-300 ${openListModal ? "top-0" : "top-[1000px]"} z-10 h-32 w-[330px] bg-[#F7F7F9]`}
          >
            {placeList.length !== 0 && (
              <div className="relative mx-auto my-0 w-[320px] pb-px pt-24 text-right">
                <Select
                  optionName={
                    userLocation.isSetUserLocation
                      ? ["추천순", "별점순", "거리순"]
                      : ["추천순", "별점순"]
                  }
                  optionValue={
                    userLocation.isSetUserLocation
                      ? ["recommend", "rating", "distance"]
                      : ["recommend", "rating"]
                  }
                  handler={handleSetFilter}
                />
              </div>
            )}
          </div>

          <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3 pb-4 pt-[8.5rem]">
            {placeList.length === 0 ? (
              //맛집이 없는 경우 메세지로 알림 추가
              <div className="mt-44 flex flex-col items-center gap-3">
                <MdErrorOutline className="h-10 w-10 text-mainY" />
                <span className="text-sm text-subGray">
                  리뷰가 등록된 맛집이 없습니다
                </span>
              </div>
            ) : (
              <>
                {placeList.map((place) => {
                  return (
                    <PlaceInfoCard
                      key={place.id}
                      place={place}
                      userLocation={userLocation}
                      type="main"
                    />
                  );
                })}
              </>
            )}
          </div>
        </PerfectScrollar>
      </div>
    </div>
  );
}
