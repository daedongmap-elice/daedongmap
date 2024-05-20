import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/utils/baseUrl";
import { AiOutlineMore } from "react-icons/ai";
import Toast from "@/components/common/Toast";

interface EditButtonProps {
  reviewId: number;
}

const ReviewEditBtn = ({ reviewId }: EditButtonProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const shouldDelete = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    if (shouldDelete) {
      e.preventDefault();
      try {
        await axiosClient.delete(`/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/review");
        setShowToast(true);
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
          <a href={`/edit/#${reviewId}`}>수정</a>
        </li>
        <li>
          <a href="/" onClick={handleDelete}>
            삭제
          </a>
        </li>
      </ul>
      {showToast && (
        <Toast setToast={setShowToast} message="리뷰가 삭제되었습니다." />
      )}
    </div>
  );
};

export default ReviewEditBtn;
