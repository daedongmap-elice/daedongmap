import { IoSearch } from "react-icons/io5";
import { PlaceInfoCard } from "@/components/map/index";

interface PlaceListModalProps {
  openListModal: boolean;
  placeList:
    | {
        place_name: string;
        place_url: string;
        category_name: string;
        address_name: string;
        road_address_name: string;
        id: string;
        phone: string;
        x: string;
        y: string;
      }[]
    | undefined;
  userLocation: {
    center: {
      lat: number;
      lng: number;
    };
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
          <IoSearch className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
        </div>
      )}
      <div
        className={`fixed z-10 h-[95.3vh] w-full overflow-y-auto bg-[#F7F7F9] pb-5 pt-16 transition-all duration-100 ${openListModal ? "top-0" : "top-[1000px]"}`}
      >
        <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3">
          {placeList === undefined ? (
            //맛집이 없는 경우 메세지로 알림 추가
            <></>
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
      </div>
    </div>
  );
}
