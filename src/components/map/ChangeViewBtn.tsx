import { FaListUl, FaMapMarkedAlt } from "react-icons/fa";

type ChangeViewBtnProps = {
  onClick: () => void;
  btnType: "listView" | "mapView";
};

export default function ChangeViewBtn({
  onClick,
  btnType,
}: ChangeViewBtnProps) {
  return (
    <button
      className={`btn btn-sm rounded-full border-none shadow ${btnType === "mapView" ? "bg-white" : "bg-mainG text-GbtnText"}`}
      onClick={onClick}
    >
      {btnType === "mapView" ? (
        <>
          <FaListUl className="h-4 w-4"></FaListUl>
          목록보기
        </>
      ) : (
        <>
          <FaMapMarkedAlt className="h-4 w-4"></FaMapMarkedAlt>
          지도보기
        </>
      )}
    </button>
  );
}
