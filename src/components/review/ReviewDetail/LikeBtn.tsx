import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeProps {
  currentReviewId: string;
  isLiked: boolean;
  handleIsLiked: () => void;
  isLikedByUser: boolean;
  likeCount: number;
}

const LikeBtn = ({
  currentReviewId,
  isLiked,
  handleIsLiked,
  isLikedByUser,
  likeCount,
}: LikeProps) => {
  const token = localStorage.getItem("accessToken");

  const likePost = async () => {
    try {
      await axios.post(
        `http://35.232.243.53:8080/api/likes?reviewId=${currentReviewId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("좋아요 post요청 에러:", error);
    }
  };

  const likeDelete = async () => {
    try {
      await axios.delete(
        `http://35.232.243.53:8080/api/likes?userId=${loginUserId}&reviewId=${currentReviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("좋아요 deleted요청 에러:", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          if (isLikedByUser && isLiked) {
            likePost();
            handleIsLiked();
          }
          if (!isLikedByUser && isLiked) {
            likeDelete();
            handleIsLiked();
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
        {!isLikedByUser && isLiked ? likeCount + 1 : likeCount}명이 좋아합니다
      </span>
    </div>
  );
};

export default LikeBtn;
