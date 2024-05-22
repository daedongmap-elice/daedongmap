import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import axiosClient from "@/utils/baseUrl";
import Toast from "@/components/common/Toast";
import Alert from "@/components/common/Alert";

interface EditButtonProps {
  reviewId: number;
}

const ReviewEditBtn = ({ reviewId }: EditButtonProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      console.log("handleDelete");
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
  };

  return (
    <div className="dropdown dropdown-end mr-1">
      <div tabIndex={0} role="button">
        <button onClick={() => setShowMenu(true)}>
          <AiOutlineMore className="h-6 w-6" />
        </button>
      </div>
      {showMenu && (
        <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
          <li>
            <Link to={`/edit/${reviewId}`}>수정</Link>
          </li>
          <li>
            <button
              onClick={() => {
                setShowAlert(true);
                setShowMenu(false);
              }}
            >
              삭제
            </button>
          </li>
        </ul>
      )}
      {showAlert && (
        <Alert
          title="정말로 이 리뷰를 삭제하시겠습니까?"
          onClick={handleDelete}
          onClose={() => setShowAlert(false)}
        />
      )}
      {showToast && (
        <Toast setToast={setShowToast} message="리뷰가 삭제되었습니다." />
      )}
    </div>
  );
};

export default ReviewEditBtn;
