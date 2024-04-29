import { AiOutlineHeart } from "react-icons/ai";

export default function LikeButton() {
  return (
    <div className="flex items-center">
      <button>
        <AiOutlineHeart className="ml-3 h-8 w-8" />
      </button>
      <span className="ml-1 text-sm text-subGray">0명이 좋아합니다</span>
    </div>
  );
}
