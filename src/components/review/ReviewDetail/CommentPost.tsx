interface CommentProps {
  reviewId: string;
}

const CommentPost: React.FC<CommentProps> = ({ reviewId }) => {
  console.log("CommentPost reviewId:", reviewId);
  return (
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
  );
};

export default CommentPost;
