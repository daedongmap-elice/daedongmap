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
      <dialog id="my_modal_3" className="modal h-5/6 fixed bottom-10">
        <div className="modal-box h-5/6 w-full rounded-b-none fixed bottom-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-base text-center">댓글</h3>
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
                className="input input-bordered w-full h-8 text-xs"
              />
              <button className="btn btn-sm h-4 bg-mainG text-GbtnText text-xs">
                확인
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
