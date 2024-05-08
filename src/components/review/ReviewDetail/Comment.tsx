import DateCreated from "../DateCreated";
import CommentEditBtn from "./CommentEditBtn";

// 아이디, 프로필사진, 닉네임, 댓글내용, 작성일을 prop로 내려받기
interface CommentProps {
  loginUserId: number;
  commentId: number;
  userId: number;
  profileImagePath: string;
  nickName: string;
  content: string;
  createdAt: string;
  onDeleteSuccess: () => void;
}

const Comment = ({
  loginUserId,
  commentId,
  userId,
  profileImagePath,
  nickName,
  content,
  createdAt,
  onDeleteSuccess,
}: CommentProps) => {
  return (
    <>
      <div className="mb-6 mt-4 flex justify-between">
        <div className="flex">
          <div>
            <a href={`/mypage/#${userId}`}>
              <img
                className="mask mask-circle ml-3 mr-3 w-9"
                src={profileImagePath}
                alt="user-profile"
              />
            </a>
          </div>
          <div className="text-xs">
            <div className="mb-2 flex w-64 items-center justify-between">
              <b>{nickName}</b>
              <DateCreated createdAt={createdAt} />
            </div>
            <p className="w-64">{content} </p>
          </div>
        </div>
        {loginUserId === userId && (
          <CommentEditBtn
            onDeleteSuccess={onDeleteSuccess}
            commentId={commentId}
          />
        )}
      </div>
    </>
  );
};

export default Comment;
