import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PerfectScrollar from "react-perfect-scrollbar";
import { Comment, CommentPost } from "@/components/review/index";
import axiosClient from "@/utils/baseUrl";

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
  const { reviewId: currentReviewId } = useParams();
  const commentRef = useRef<HTMLDivElement>(null);
  const isToken = localStorage.getItem("isToken");

  // TO FIX: 새 댓글 등록 시 하단으로 이동하는 기능을 넣었으나 동작하지 않고 있음
  const scrollToBottom = () => {
    commentRef.current?.scrollIntoView(false);
  };

  const getData = async () => {
    try {
      if (isToken) {
        const response = await axiosClient.get(
          `/comments/reviews/${currentReviewId}`
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
    if (isToken) {
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
