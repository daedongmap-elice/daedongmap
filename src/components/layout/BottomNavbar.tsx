import { BiSolidHome } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { getCookie } from "../../hooks/useCookie";

export default function BottomNavbar() {
  const getCookies = getCookie();
  return (
    <div className="btm-nav z-[100] h-9">
      <button className="rounded-none border-none bg-white pb-0">
        <a href="/">
          <BiSolidHome className="h-5 w-5" />
        </a>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <a href="/review">
          <BiSolidGridAlt className="h-5 w-5" />
        </a>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <a href={getCookies ? "/post" : "/login"}>
          <BsFillPlusCircleFill />
        </a>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <a href={getCookies ? "/mypage" : "/prelogin"}>
          <BiSolidUserCircle className="h-5 w-5" />
        </a>
      </button>
    </div>
  );
}
