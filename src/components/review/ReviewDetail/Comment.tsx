import DateCreated from "../DateCreated";

// 아이디, 프로필사진, 닉네임, 댓글내용, 작성일을 prop로 내려받기
interface CommentProps {
  userId: number;
  profileImagePath: string;
  nickName: string;
  content: string;
  createdAt: string;
}

const Comment: React.FC<CommentProps> = ({
  userId,
  profileImagePath,
  nickName,
  content,
  // createdAt,
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
          <div className="max-w-64 text-xs">
            <div className="mb-2 flex items-center justify-between">
              <b className="mr-4">{nickName}</b>
              <DateCreated createdAt={"1111-11-11"} />
            </div>
            <p className="">{content} </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default Comment;
