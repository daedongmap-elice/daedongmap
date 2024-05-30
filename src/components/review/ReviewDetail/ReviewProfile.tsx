import { Link } from "react-router-dom";

interface ReviewProfileProps {
  userId: number | undefined;
  nickName: string | undefined;
  placeName: string | undefined;
  profileImagePath: string | undefined;
}

const ReviewProfile = ({
  userId,
  nickName,
  placeName,
  profileImagePath,
}: ReviewProfileProps) => {
  const isToken = localStorage.getItem("isToken");

  return (
    <button
      onClick={() => {
        if (!isToken) {
          alert("사용자 프로필은 로그인 후 볼 수 있습니다.");
        }
      }}
    >
      <Link to={`/userpage/#${userId}`}>
        <div className="mb-3 mt-4 flex">
          <div>
            <img
              className="mask mask-circle ml-3 mr-3 w-9"
              src={profileImagePath}
              alt="user-profile"
            />
          </div>
          <div>
            <p className="mb-0.5 text-xs">
              <b>{nickName}</b>
            </p>
            <p className="text-xxs">{placeName}</p>
          </div>
        </div>
      </Link>
    </button>
  );
};

export default ReviewProfile;
