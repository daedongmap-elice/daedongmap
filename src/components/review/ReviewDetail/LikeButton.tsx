import { AiOutlineHeart } from "react-icons/ai";

export default function LikeButton() {
  return (
    <div className="flex items-center">
      <button>
        <AiOutlineHeart className="h-8 w-8 ml-3" />
      </button>
      <span className="text-sm text-subGray ml-1">0명이 좋아합니다</span>
    </div>
  );
}
