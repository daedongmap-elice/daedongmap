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
        className={`fixed z-10 h-[95.3vh] w-full bg-[#F7F7F9] pt-24 transition-all duration-300 ${openListModal ? "top-0" : "top-[1000px]"}`}
      >
        <div
          className={`fixed transition-all duration-300 ${openListModal ? "top-0" : "top-[1000px]"} z-10 h-24 w-full bg-[#F7F7F9]`}
        ></div>
        <div className="relative mx-auto my-0 w-[320px] pb-px text-right">
          <Select
            optionName={["추천순", "별점순", "거리순"]}
            optionValue={["default", "rating", "distance"]}
            handler={handleSetFilter}
          />
        </div>
        <PerfectScrollar>
          <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3 pb-11 pt-px">
            {placeList.length === 0 ? (
              //맛집이 없는 경우 메세지로 알림 추가
              <div className="mt-40 flex flex-col items-center gap-3">
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
