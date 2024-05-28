import { BiSolidHome } from "react-icons/bi";
import { BiSolidGridAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { isTokenAtom, profileAtom } from "../atom/auth";

export default function BottomNavbar() {
  const [isToken] = useAtom(isTokenAtom);
  const [profile] = useAtom(profileAtom);
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
          {isToken ? (
            <img
              src={profile.profileImage}
              alt="프로필 이미지"
              className="h-5 w-5 rounded-full"
            />
          ) : (
            <BiSolidUserCircle className="h-5 w-5" />
          )}
        </Link>
      </button>
    </div>
  );
}
