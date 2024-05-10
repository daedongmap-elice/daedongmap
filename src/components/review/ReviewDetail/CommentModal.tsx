import { Comment, CommentPost } from "@/components/review/index";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PerfectScrollar from "react-perfect-scrollbar";

interface CommentModalProps {
  handleCommentCount: (count: number) => void;
  loginUserId: number;
}

interface CommentModalResponse {
  id: number;
  user: {
    id: number;
    nickName: string;
    email: string;
    profileImagePath: string;
  };
  content: string;
  createdAt: string;
}

const CommentModal = ({
  handleCommentCount,
  loginUserId,
}: CommentModalProps) => {
  const [data, setData] = useState<CommentModalResponse[]>([]);
  const currentReviewId = window.location.hash.substring(1);
  // 부모 컴포넌트에서 자식의 DOM요소 접근 시는 useRef 대신 forwardRef를 사용해 접근
  const commentRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("accessToken");

  // TOFIX: 새 댓글 등록 시 하단으로 이동하는 기능을 넣었으나 동작하지 않고 있음
  const scrollToBottom = () => {
    commentRef.current?.scrollIntoView(false);
  };

  const getData = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `http://35.232.243.53:8080/api/comments/reviews/${currentReviewId}`
        );
        setData(response.data);
        handleCommentCount(response.data.length);
        scrollToBottom();
      }
    } catch (error) {
      console.error("댓글창 get요청 에러", error);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, []);

  return (
    <>
      <div className="modal-box h-5/6 w-full rounded-b-none pl-4">
        <h3 className="text-center text-base font-bold">댓글</h3>
        <PerfectScrollar>
          <div className="h-5/6 overflow-auto" ref={commentRef}>
            {data.map((comment, i) => (
              <Comment
                key={`comment${i}`}
                loginUserId={loginUserId}
                commentId={comment.id}
                userId={comment.user.id}
                profileImagePath={comment.user.profileImagePath}
                nickName={comment.user.nickName}
                content={comment.content}
                createdAt={comment.createdAt}
                getData={getData}
              />
            ))}
          </div>
        </PerfectScrollar>
        <CommentPost
          loginUserId={loginUserId}
          reviewId={currentReviewId}
          getData={getData}
          scrollToBottom={scrollToBottom}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
};

export default CommentModal;
