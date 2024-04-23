import Comment from "./Comment";

export default function CommentModal() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal fixed bottom-10 h-5/6">
        <div className="modal-box fixed bottom-0 h-5/6 w-full rounded-b-none">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-center text-base font-bold">댓글</h3>
          <p className="py-4 text-xs">
            Press ESC key or click on ✕ button to close
          </p>
          <Comment />
          <Comment />
          <Comment />
          <div className="fixed bottom-5 w-10/12">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="댓글 달기..."
                className="input input-bordered h-8 w-full text-xs"
              />
              <button className="btn btn-sm h-4 bg-mainG text-xs text-GbtnText">
                확인
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
