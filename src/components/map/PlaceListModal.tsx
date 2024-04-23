import { IoSearch } from "react-icons/io5";
import Logo from "./../../../public/img/logo.png";
import { PlaceInfoCard } from "./PlaceInfoCard";
import { ChangeViewBtn } from "./ChangeViewBtn";

interface PlaceListModalProps {
  onClick: () => void;
}

export function PlaceListModal({ onClick }: PlaceListModalProps) {
  return (
    <>
      <div className="absolute top-0 z-10 w-full">
        <div className="fixed z-10 h-[5.3vh] w-full bg-white">
          <img src={Logo} alt="로고" className="mx-auto my-0 h-full" />
          <IoSearch className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
        </div>
        <div className="z-10 h-[95.3vh] h-fit w-full overflow-y-auto bg-[#F7F7F9] pt-16">
          <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3">
            <PlaceInfoCard />
            <PlaceInfoCard />
            <PlaceInfoCard />
            <PlaceInfoCard />
          </div>
        </div>
      </div>
      <div className={`absolute bottom-16 left-1/2 z-10 -translate-x-1/2`}>
        <ChangeViewBtn onClick={onClick} />
      </div>
    </>
  );
}
