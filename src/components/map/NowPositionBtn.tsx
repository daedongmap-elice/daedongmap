import { MdMyLocation } from "react-icons/md";

// interface NowPositionBtnProps {
//   onClick?: () => void;
// }

export default function NowPositionBtn() {
  return (
    <button className="btn btn-circle btn-sm border-none bg-white shadow">
      <MdMyLocation className="h-4 w-4 text-mainG" />
    </button>
  );
}
