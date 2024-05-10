import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

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
  const token = localStorage.getItem("accessToken");

  const likePost = async () => {
    try {
      await axios.post(
        `http://35.232.243.53:8080/api/likes?reviewId=${reviewId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleIsLiked(true);
    } catch (error) {
      console.error("좋아요 post요청 에러:", error);
    }
  };

  const likeDelete = async () => {
    try {
      await axios.delete(
        `http://35.232.243.53:8080/api/likes?reviewId=${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleIsLiked(false);
    } catch (error) {
      console.error("좋아요 deleted요청 에러:", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          if (!token) {
            alert("좋아요는 로그인 후 누를 수 있습니다.");
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
    </div>
  );
};

export default LikeBtn;
