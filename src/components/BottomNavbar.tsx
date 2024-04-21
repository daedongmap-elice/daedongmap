import { BiSolidHome } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";

export default function BottomNavbar() {
  return (
    <div className="btm-nav h-9">
      <button className="pb-0 border-none rounded-none bg-white">
        <a href="/">
          <BiSolidHome className="h-5 w-5" />
        </a>
      </button>
      <button className="pb-0 border-none rounded-none bg-white">
        <a href="/review">
          <BiSolidGridAlt className="h-5 w-5" />
        </a>
      </button>
      <button className="pb-0 border-none rounded-none bg-white">
        <a href="/post">
          <BsFillPlusCircleFill />
        </a>
      </button>
      <button className="pb-0 border-none rounded-none bg-white">
        <a href="/mypage">
          <BiSolidUserCircle className="h-5 w-5" />
        </a>
      </button>
    </div>
  );
}
