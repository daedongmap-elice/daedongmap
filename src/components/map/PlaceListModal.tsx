import { IoSearch } from "react-icons/io5";
import { PlaceInfoCard } from "@/components/map/index";

interface PlaceListModalProps {
  openListModal: boolean;
  placeList: {
    place_name: string;
    place_url: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    id: string;
    phone: string;
    x: string;
    y: string;
  }[];
}

export default function PlaceListModal({
  openListModal,
  placeList,
}: PlaceListModalProps) {
  console.log(placeList);
  return (
    <div>
      {openListModal && (
        <div className="absolute top-0 z-20 h-[5.3vh] w-full bg-white">
          <img src="img/logo.png" alt="로고" className="mx-auto my-0 h-full" />
          <IoSearch className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
        </div>
      )}
      <div
        className={`fixed z-10 h-[95.3vh] w-full overflow-y-auto bg-[#F7F7F9] pb-5 pt-16 transition-all duration-100 ${openListModal ? "top-0" : "top-[1000px]"}`}
      >
        <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3">
          {placeList.map((place) => {
            return <PlaceInfoCard place={place} />;
          })}
        </div>
      </div>
    </div>
  );
}
