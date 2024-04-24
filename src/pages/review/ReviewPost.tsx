import { RatingStar, ImageInput } from "@/components/review/index";

export default function ReviewPost() {
  const handleSubmit = () => {
    // e.preventDefault();
  };
  const openSearch = () => {};
  return (
    <>
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">새 리뷰 등록하기</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-3"
      >
        <div className="flex justify-center">
          <ImageInput />
        </div>
        <div className="mt-3 flex flex-col items-center justify-center gap-2 pl-5 pr-5 text-xs">
          <div className="flex items-center gap-1">
            <span className="min-w-6 text-center">맛</span>
            <RatingStar />
          </div>
          <div className="flex items-center gap-1">
            <span className="min-w-6">위생</span>
            <RatingStar />
          </div>
          <div className="mb-3 flex items-center gap-1">
            <span className="min-w-6">친절</span>
            <RatingStar />
          </div>
        </div>
        <input
          type="text"
          placeholder="장소 선택"
          className="input input-sm input-bordered w-3/4 max-w-xs flex-col text-xs"
          onClick={openSearch}
        />
        <select className="select select-bordered select-sm w-3/4 max-w-xs text-xs">
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
          className="textarea textarea-bordered h-32 w-3/4 max-w-xs pt-3 text-xs"
          placeholder="리뷰 내용 입력..."
        ></textarea>
        <button className="btn btn-sm mt-2 w-1/2 bg-mainY font-medium text-YbtnText">
          리뷰 등록
        </button>
      </form>
    </>
  );
}
