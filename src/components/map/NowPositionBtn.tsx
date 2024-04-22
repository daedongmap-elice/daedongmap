import { MdMyLocation } from "react-icons/md";

export function NowPositionBtn() {
  return (
    <div className="absolute right-4 bottom-16 z-10">
      <button className="btn btn-circle bg-white border-none btn-sm shadow">
        <MdMyLocation className="h-4 w-4 text-mainG" />
      </button>
    </div>
  );
}
