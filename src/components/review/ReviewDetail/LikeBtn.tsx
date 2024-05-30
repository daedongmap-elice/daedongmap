import { useState } from "react";
import axiosClient from "@/utils/baseUrl";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Toast from "@/components/common/Toast";

interface LikeProps {
  reviewId: number;
  isLiked: boolean;
  handleIsLiked: (bool: boolean) => void;
  isLikedByUser: boolean;
  likeCount: number;
}

const LikeBtn = ({
  reviewId,
  isLiked,
  handleIsLiked,
  isLikedByUser,
  likeCount,
}: LikeProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const isToken = localStorage.getItem("isToken");

  const likePost = async () => {
    try {
      await axiosClient.post(`/likes?reviewId=${reviewId}`, null);
      handleIsLiked(true);
    } catch (error) {
      console.error("좋아요 post요청 에러:", error);
    }
  };

  const likeDelete = async () => {
    try {
      await axiosClient.delete(`/likes?reviewId=${reviewId}`);
      handleIsLiked(false);
    } catch (error) {
      console.error("좋아요 deleted요청 에러:", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          if (!isToken) {
            setShowToast(true);
            return;
          }
          if (!isLikedByUser) {
            likePost();
          }
          if (isLikedByUser) {
            likeDelete();
          }
        }}
      >
        {isLiked ? (
          <AiFillHeart className="ml-3 h-8 w-8" />
        ) : (
          <AiOutlineHeart className="ml-3 h-8 w-8" />
        )}
      </button>
      <span className="ml-1 text-sm text-subGray">
        {likeCount}명이 좋아합니다
      </span>
      {showToast && (
        <Toast
          setToast={setShowToast}
          message="좋아요는 로그인 후 누를 수 있습니다."
        />
      )}
    </div>
  );
};

export default LikeBtn;
