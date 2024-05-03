interface ReviewProfileProps {
  userId: number | undefined;
  nickName: string | undefined;
  placeName: string | undefined;
}

const ReviewProfile: React.FC<ReviewProfileProps> = ({
  // userId,
  nickName,
  placeName,
}) => {
  // TODO: ReviewProfile 클릭하면 userId를 가지고(?) '마이페이지'로 넘어가서 '사용자별 리뷰 조회'

  return (
    <>
      <a href="/">
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
