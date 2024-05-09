import { AiOutlineMore } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

interface EditButtonProps {
  commentId: number;
  getData: () => void;
}

const CommentEditBtn = ({ commentId, getData }: EditButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://35.232.243.53:8080/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      // alert("댓글이 삭제되었습니다.");
      getData();
      setShowMenu(false);
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
            {/* <li>
            <a href={"/"} onClick={}>
              수정
            </a>
          </li> */}
            <li>
              <button onClick={handleDelete}>댓글 삭제</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default CommentEditBtn;
