import { AiOutlineMore } from "react-icons/ai";
import axios from "axios";

interface EditButtonProps {
  commentId: number;
  onDeleteSuccess: () => void;
}

const CommentEditBtn: React.FC<EditButtonProps> = ({
  commentId,
  onDeleteSuccess,
}) => {
  // TODO: 삭제 버튼 클릭 시 현재 리뷰아이디로 delete요청 보내기
  //      '리뷰를 삭제하시겠습니까?' 모달 띄우고 확인/취소 버튼

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://35.232.243.53:8080/api/comments/${commentId}`
      );
      console.log(response);
      alert("댓글이 삭제되었습니다.");
      onDeleteSuccess();
    } catch (error) {
      console.error("댓글삭제 delete요청 에러", error);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end mr-1">
        <div tabIndex={0} role="button">
          <AiOutlineMore className="h-6 w-6" />
        </div>
        <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
          {/* <li>
            <a href={"/"} onClick={}>
              수정
            </a>
          </li> */}
          <li>
            <button onClick={handleDelete}>삭제</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CommentEditBtn;
