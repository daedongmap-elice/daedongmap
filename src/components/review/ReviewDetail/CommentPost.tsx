import { useCallback, useRef, useState } from "react";
import axios from "axios";

interface CommentPostProps {
  loginUserId: number;
  reviewId: string;
  getData: () => void;
  scrollToBottom: () => void;
}

const CommentPost = ({
  loginUserId,
  reviewId,
  getData,
  scrollToBottom,
}: CommentPostProps) => {
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("accessToken");

  // 나의 유저아이디 가져와야 함
  const handleSubmit = useCallback(async () => {
    try {
      await axios.post(
        "http://35.232.243.53:8080/api/comments",
        {
          userId: loginUserId,
          reviewId: reviewId,
          content: content,
          parentId: null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getData();
      scrollToBottom();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("댓글등록 실패:", error);
    }
  }, [content]);

  return (
    <div className="fixed bottom-9 w-full">
      <div className="flex justify-center">
        <div className="flex w-10/12 gap-2">
          <input
            required
            type="text"
            placeholder="댓글 달기..."
            className="input input-bordered h-8 w-full text-xs"
            onChange={(e) => setContent(e.target.value)}
            // onKeyDown={(e) => {
            //   // 댓글이 2개 등록되는 이슈로 onKeyDown 주석 처리
            //   if (e.key === "Enter") {
            //     e.preventDefault();
            //     if (token) {
            //       handleSubmit();
            //     } else {
            //       alert("댓글 작성은 로그인 후 가능합니다.");
            //     }
            //   }
            // }}
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={(e) => {
              if (token) {
                e.preventDefault();
                handleSubmit();
              } else {
                alert("댓글 작성은 로그인 후 가능합니다.");
              }
            }}
            className="btn btn-sm mr-2 h-4 bg-mainG text-xs text-GbtnText"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPost;
