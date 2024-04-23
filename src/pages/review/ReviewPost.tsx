import ImageInput from "@/components/review/ReviewPost/ImageInput";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ReviewPost() {
  const handleSubmit = () => {
    // e.preventDefault();
  };
  return (
    <>
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">새 리뷰 등록하기</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex justify-center">
          <ImageInput />
        </div>
        <div>
          <input
            type="text"
            placeholder="장소 선택"
            className="min-w-3/4 input input-bordered h-8 w-full text-sm"
          />
          <FaMapMarkerAlt className="inline h-5 w-5 text-mainG" />
        </div>
        <select className="select select-bordered w-3/4 max-w-xs">
          <option disabled selected>
            분류 선택
          </option>
          <option>한식</option>
          <option>중식</option>
          <option>일식</option>
          <option>양식</option>
          <option>기타</option>
        </select>
        <textarea
          className="textarea textarea-bordered w-3/4"
          placeholder="리뷰 내용 입력..."
        ></textarea>
        <button className="btn btn-sm w-3/4 bg-mainY text-YbtnText">
          리뷰 등록
        </button>
      </form>
    </>
  );
}
