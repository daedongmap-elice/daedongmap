import { BiSolidHome } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { getToken } from "../../hooks/useToken";
import { useEffect, useState } from "react";

export default function BottomNavbar() {
  const [isToken, setIsToken] = useState<boolean>(false);
  useEffect(() => {
    setIsToken(getToken());
    console.log(isToken);
  }, [isToken]);
  return (
    <div className="btm-nav z-[100] h-9 border border-x-0 border-b-0 border-solid border-gray-200">
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
        <a href={isToken ? "/post" : "/login"}>
          <BsFillPlusCircleFill />
        </a>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <a href={isToken ? "/mypage" : "/prelogin"}>
          <BiSolidUserCircle className="h-5 w-5" />
        </a>
      </button>
    </div>
  );
}
