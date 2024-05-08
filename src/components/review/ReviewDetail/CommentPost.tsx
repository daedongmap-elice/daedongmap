import { useRef, useState } from "react";
import axios from "axios";

interface CommentPostProps {
  loginUserId: number;
  reviewId: string;
  onPostSuccess: () => void;
}

const CommentPost = ({
  loginUserId,
  reviewId,
  onPostSuccess,
}: CommentPostProps) => {
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("accessToken");

  // 나의 유저아이디 가져와야 함
  const handleSubmit = async () => {
    console.log(content);
    try {
      const response = await axios.post(
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
      console.log("응답 데이터:", response.data);
      onPostSuccess();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("댓글등록 실패:", error);
    }
  };

  return (
    <div className="fixed bottom-7 w-full">
      <div className="flex justify-center">
        <div className="flex w-10/12 gap-2">
          <input
            required
            type="text"
            placeholder="댓글 달기..."
            className="input input-bordered h-8 w-full text-xs"
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={handleSubmit}
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
