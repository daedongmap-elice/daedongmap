import { useState } from "react";
import axiosClient from "@/utils/baseUrl";
import { AiOutlineMore } from "react-icons/ai";
import Toast from "@/components/common/Toast";

interface EditButtonProps {
  commentId: number;
  getData: () => void;
}

const CommentEditBtn = ({ commentId, getData }: EditButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");

  const handleDelete = async () => {
    try {
      const response = await axiosClient.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      getData();
      setShowMenu(false);
      setShowToast(true);
    } catch (error) {
      console.error("댓글삭제 delete요청 에러", error);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <button tabIndex={0} onClick={() => setShowMenu(true)}>
          <AiOutlineMore className="h-6 w-6" />
        </button>
        {showMenu && (
          <ul className="menu dropdown-content z-[1] w-28 rounded-box bg-base-100 p-2 shadow">
            <li>
              <button onClick={handleDelete}>댓글 삭제</button>
            </li>
          </ul>
        )}
        {showToast && (
          <Toast setToast={setShowToast} message="댓글이 삭제되었습니다." />
        )}
      </div>
    </>
  );
};

export default CommentEditBtn;
