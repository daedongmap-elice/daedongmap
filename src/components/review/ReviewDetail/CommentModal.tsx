import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";

// TODO: 댓글api에 get요청 보내고 데이터 뿌리기. 대댓글..?
// TODO: CommentModal에서도 각 댓글에서 로그인userID와 댓글userID가 일치할 경우에만 EditButton 표시

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

export default function CommentModal() {
  const [data, setData] = useState<CommentModalResponse[]>([]);
  console.log("댓글창에서받아온데이터", data);

  const getData = async () => {
    try {
      const currentReviewId = window.location.hash.substring(1);
      const response = await axios.get(
        `http://35.232.243.53:8080/api/comments/reviews/${currentReviewId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("댓글창 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="modal-box h-5/6 w-full rounded-b-none pl-1.5">
        <h3 className="text-center text-base font-bold">댓글</h3>
        {data.map((comment, i) => (
          <Comment
            key={`comment${i}`}
            userId={comment.user.id}
            profileImagePath={comment.user.profileImagePath}
            nickName={comment.user.nickName}
            content={comment.content}
            createdAt={comment.createdAt}
          />
        ))}
        <div className="fixed bottom-7 w-full">
          <div className="flex justify-center">
            <form className="flex w-10/12 gap-2">
              <input
                type="text"
                placeholder="댓글 달기..."
                className="input input-bordered h-8 w-full text-xs"
              />
              <button className="btn btn-sm mr-2 h-4 bg-mainG text-xs text-GbtnText">
                확인
              </button>
            </form>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}
