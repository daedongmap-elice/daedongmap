import { UserInfo, ReviewResponse } from "@/type/types";
import { AiOutlineMore } from "react-icons/ai";
import { RiLink } from "react-icons/ri";
import ReviewGallery from "@/pages/review/ReviewGallery";
import UserModal from "./userModal";
import { Link } from "react-router-dom";

interface MypageProps {
  profile: UserInfo;
  isClickLogout?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isClickDeleteModal?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isClickFollowersModal?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  isModal?: boolean;
  isClickDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonDisabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reviews: ReviewResponse[];
  userId?: string;
  isClickFollow?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickEditButton?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  follow?: any;
  type: string;
}

const MyPagePresent: React.FC<MypageProps> = ({
  profile,
  isClickLogout,
  isClickDeleteModal,
  isClickFollowersModal,
  isModal,
  isClickDelete,
  handleChange,
  buttonDisabled,
  reviews,
  userId,
  isClickFollow,
  onClickEditButton,
  follow,
  type,
}) => {
  return (
    <>
      <div className="mt-9 flex flex-col items-center">
        <div className="flex w-full flex-row items-center justify-end">
          <div className="w-full pl-16 text-center text-2xl font-semibold">
            {profile.nickName}
          </div>
          {userId ? (
            <></>
          ) : (
            <div className="dropdown dropdown-end pr-4">
              <div tabIndex={0} role="button">
                <AiOutlineMore className="h-6 w-6" />
              </div>
              <ul className="menu dropdown-content z-[1] w-28 rounded-box bg-base-100 p-2 text-center shadow">
                <li className="mb-2">
                  <button
                    className="btn btn-outline btn-success mx-auto text-center"
                    onClick={isClickLogout}
                  >
                    로그아웃
                  </button>
                </li>
                <button
                  className="btn btn-outline btn-error mx-auto text-center"
                  onClick={isClickDeleteModal}
                >
                  회원탈퇴
                </button>
              </ul>
            </div>
          )}
        </div>
        <div className="flex w-full flex-row justify-center pt-3">
          <div className="avatar mr-4">
            <div className="w-[70px] rounded-full border border-solid  border-subGray">
              <img src={profile.profileImage} alt="프로필 이미지 " />
            </div>
          </div>
          <div className="flex w-6/12 flex-col justify-center">
            <div className="flex flex-row justify-around">
              <div className="flex flex-col">
                <p className="text-center text-lg font-semibold">
                  {reviews.length}
                </p>
                <span className="mr-1 text-xs text-subGray">게시물</span>
              </div>
              <div className="flex flex-col">
                <Link
                  className="mr-1 text-xs text-subGray"
                  to="/followers"
                  onClick={isClickFollowersModal}
                >
                  <p className="text-center text-lg font-semibold text-black">
                    {follow?.followers.length}
                  </p>
                  팔로워
                </Link>
              </div>
              <div className="flex flex-col">
                <span className="text-center text-lg font-semibold">
                  {follow?.followings.length}
                </span>
                <span className="mr-1 text-xs text-subGray">팔로잉</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3 flex w-full flex-col pl-8">
          <span className="pl-2.5 text-sm">{profile.status}</span>
          {profile.webSite === "아직 연결된 외부 사이트가 없습니다." ? (
            <></>
          ) : (
            <div className="flex flex-row pl-2.5 text-xs">
              <p className="mr-2 flex items-center">
                <RiLink />
              </p>
              <a
                className="w-24 truncate text-center"
                href={profile.webSite}
                target="_blank"
              >
                {profile.webSite}
              </a>
            </div>
          )}
        </div>
        {userId ? (
          <div className="">
            <button
              className="btn btn-sm mt-[30px] w-[280px] bg-mainG text-GbtnText"
              onClick={isClickFollow}
            >
              팔로우
            </button>
          </div>
        ) : (
          <button
            className="btn btn-sm w-80 bg-mainG text-GbtnText"
            onClick={onClickEditButton}
          >
            프로필 편집
          </button>
        )}
        {isModal && (
          <UserModal
            isClickDelete={isClickDelete}
            isClickModal={isClickDeleteModal}
            handleChange={handleChange}
            buttonDisabled={buttonDisabled}
            type={type}
          />
        )}
        <hr className="mt-5 w-full border-t border-solid border-subLightGray" />
        <div className="mt-3">
          <ReviewGallery type="myPage" myPageData={reviews} />
        </div>
      </div>
    </>
  );
};

export default MyPagePresent;
