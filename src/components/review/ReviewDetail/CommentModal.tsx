import Comment from "./Comment";

// TODO: 댓글api에 get요청 보내고 데이터 뿌리기
// TODO: CommentModal에서도 각 댓글에서 로그인userID와 댓글userID가 일치할 경우에만 EditButton 표시

export default function CommentModal() {
  return (
    <>
      <div className="modal-box h-5/6 w-full rounded-b-none pl-1.5">
        <h3 className="text-center text-base font-bold">댓글</h3>
        <Comment />
        <Comment />
        <Comment />
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
