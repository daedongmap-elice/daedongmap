import { AiOutlineMore } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  currentReviewId: string;
}

const ReviewEditBtn = ({ currentReviewId }: EditButtonProps) => {
  // TODO: 삭제 버튼 클릭 시 현재 리뷰아이디로 delete요청 보내기
  //      '리뷰를 삭제하시겠습니까?' 모달 띄우고 확인/취소 버튼
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const shouldDelete = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    if (shouldDelete) {
      e.preventDefault();
      try {
        const response = await axios.delete(
          `http://35.232.243.53:8080/api/reviews/${currentReviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        navigate("/review");
        window.alert("삭제되었습니다.");
      } catch (error) {
        console.error("리뷰삭제 delete요청 에러", error);
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="dropdown dropdown-end mr-1">
      <div tabIndex={0} role="button">
        <AiOutlineMore className="h-6 w-6" />
      </div>
      <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
        <li>
          <a href={`/edit/#${currentReviewId}`}>수정</a>
        </li>
        <li>
          <a href="/" onClick={handleDelete}>
            삭제
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ReviewEditBtn;
