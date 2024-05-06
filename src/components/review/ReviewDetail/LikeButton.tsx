import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeProps {
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
}

const LikeButton: React.FC<LikeProps> = ({
  isLiked,
  setIsLiked,
  likeCount,
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          setIsLiked((prev) => !prev);
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

export default LikeButton;
