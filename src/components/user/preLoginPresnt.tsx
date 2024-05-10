import { useAtom } from "jotai";
import { Fragment, ReactNode } from "react";
import { isTokenAtom } from "../atom/auth";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}
export default function PreLogin({ children }: Props) {
  const [isToken] = useAtom(isTokenAtom);
  return (
    <Fragment>
      {isToken === false ? (
        <div className="mt-[130px] flex w-full flex-col items-center justify-center">
          <a href="/">
            <img
              className="h-[290px] w-[275px]"
              src="img/LoginLogo.png"
              alt="로고 이미지"
            />
          </a>
          <a href="/signup">
            <button className="btn mb-[23px] h-[40px] w-[235px] bg-mainY text-YbtnText">
              회원가입
            </button>
          </a>
          <Link to="/login">
            <button className="btn h-[40px] w-[235px] bg-mainG text-GbtnText">
              로그인
            </button>
          </Link>
        </div>
      ) : (
        children
      )}
    </Fragment>
  );
}
