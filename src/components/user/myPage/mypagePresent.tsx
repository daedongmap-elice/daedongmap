import { UserInfo, ReviewResponse } from "@/type/types";
import { AiOutlineMore } from "react-icons/ai";
import { RiLink } from "react-icons/ri";
import ReviewGallery from "@/pages/review/ReviewGallery";
import { Link } from "react-router-dom";

interface MypageProps {
  profile: UserInfo;
  isClickLogout?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isClickModal?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isModal?: boolean;
  isClickDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonDisabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reviews: ReviewResponse[];
  userId?: string;
  isClickFollow?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MyPagePresent: React.FC<MypageProps> = ({
  profile,
  isClickLogout,
  isClickModal,
  isModal,
  isClickDelete,
  handleChange,
  buttonDisabled,
  reviews,
  userId,
  isClickFollow,
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-9 flex w-full flex-row justify-center">
          <div className="avatar mr-4">
            <div className="w-[107px] rounded-full border border-solid  border-subGray">
              <img src={profile.profileImage} alt="프로필 이미지 " />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-semibold">{profile.nickName}</span>
            <div>
              <span className="mr-1 text-xs text-subGray">게시글</span>
              <span className="text-xs">{reviews.length}</span>
            </div>
            <span className="text-sm">{profile.status}</span>
            {profile.webSite === "아직 연결된 외부 사이트가 없습니다." ? (
              <></>
            ) : (
              <div className="flex flex-row text-xs">
                <p className="mr-2 flex items-center">
                  <RiLink />
                </p>
                <p className="text-center">{profile.webSite}</p>
              </div>
            )}
          </div>
          {userId ? (
            <></>
          ) : (
            <div className="dropdown dropdown-end mr-1">
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
                  onClick={isClickModal}
                >
                  회원탈퇴
                </button>
              </ul>
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
          <button className="btn btn-sm mt-[30px] w-[280px] bg-mainG text-GbtnText">
            <Link to="/editprofile">프로필 편집</Link>
          </button>
        )}
        {isModal && (
          <div className="modal-overlay flex justify-center">
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                  onClick={isClickModal}
                >
                  ✕
                </button>
              </form>
              <h3 className="text-bg-error text-center text-lg font-bold">
                회원탈퇴
              </h3>
              <p className="py-4 text-center">회원탈퇴 하시겠습니까?</p>
              <input
                type="text"
                name="message"
                placeholder="회원탈퇴를 입력해주세요."
                onChange={handleChange}
                className="input input-sm input-bordered w-full max-w-xs"
              />
              <button
                className="btn btn-sm mt-[30px] w-[280px] bg-mainG text-GbtnText"
                disabled={buttonDisabled}
                onClick={isClickDelete}
              >
                회원탈퇴
              </button>
            </div>
          </div>
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
