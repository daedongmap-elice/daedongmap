interface ReviewProfileProps {
  userId: number | undefined;
  nickName: string | undefined;
  placeName: string | undefined;
  profileImagePath: string | undefined;
}

const ReviewProfile: React.FC<ReviewProfileProps> = ({
  userId,
  nickName,
  placeName,
  profileImagePath,
}) => {
  return (
    <>
      <a href={`/mypage/#${userId}`}>
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
      </a>
    </>
  );
};

export default ReviewProfile;
