import { useCallback, useRef, useState } from "react";
import axiosClient from "@/utils/baseUrl";
import Toast from "@/components/common/Toast";

interface CommentPostProps {
  loginUserId: number;
  reviewId?: string;
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
  const [showToast, setShowToast] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("accessToken");

  // 나의 유저아이디 가져와야 함
  const handleSubmit = useCallback(async () => {
    try {
      await axiosClient.post(
        "/comments",
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

  // 댓글이 2개 등록되는 이슈로 onKeyDown 이벤트 주석 처리함
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (token) {
  //       handleSubmit();
  //       return;
  //     }
  //     alert("댓글 작성은 로그인 후 가능합니다.");
  //   }
  // };

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
            // onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={(e) => {
              if (token) {
                e.preventDefault();
                handleSubmit();
                return;
              }
              setShowToast(true);
            }}
            className="btn btn-sm mr-2 h-4 bg-mainG text-xs text-GbtnText"
          >
            확인
          </button>
          {showToast && (
            <Toast
              setToast={setShowToast}
              message="댓글 달기는 로그인 후 가능합니다."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPost;
