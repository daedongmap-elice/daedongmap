interface ReviewProfileProps {
  userId: number | undefined;
  nickName: string | undefined;
  placeName: string | undefined;
}

// TODO: 백엔드 수정되면 프로필사진도 prop로 넘겨받아서 뿌리기
const ReviewProfile: React.FC<ReviewProfileProps> = ({
  userId,
  nickName,
  placeName,
}) => {
  return (
    <>
      <a href={`/mypage/#${userId}`}>
        <div className="mb-3 mt-4 flex">
          <div>
            <img
              className="mask mask-circle ml-3 mr-3 w-9"
              src="img/sample3.png"
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
      </a>
    </>
  );
};

export default ReviewProfile;
