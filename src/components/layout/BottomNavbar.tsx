import { BiSolidHome } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { getToken } from "../../utils/useToken";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BottomNavbar() {
  const [isToken, setIsToken] = useState<boolean>(false);
  useEffect(() => {
    setIsToken(getToken());
    console.log(isToken);
  }, [isToken]);

  return (
    <div className="btm-nav z-[100] h-9 border border-x-0 border-b-0 border-solid border-gray-200">
      <button className="rounded-none border-none bg-white pb-0">
        <Link to="/">
          <BiSolidHome className="h-5 w-5" />
        </Link>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <Link to="/review">
          <BiSolidGridAlt className="h-5 w-5" />
        </Link>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <Link to={isToken ? "/post" : "/login"}>
          <BsFillPlusCircleFill />
        </Link>
      </button>
      <button className="rounded-none border-none bg-white pb-0">
        <Link to={isToken ? "/mypage" : "/prelogin"}>
          <BiSolidUserCircle className="h-5 w-5" />
        </Link>
      </button>
    </div>
  );
}
