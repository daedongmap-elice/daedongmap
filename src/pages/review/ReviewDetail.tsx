import {
  EditButton,
  ReviewImage,
  LikeButton,
  DateCreated,
  RatingStar,
  ReviewProfile,
} from "@/components/review/index";

export default function ReviewDetail() {
  const handleSeeMore = (event: React.MouseEvent) => {
    const button = event.target as HTMLButtonElement;
    button.style.display = "none";

    const content = document.getElementById("content") as HTMLDivElement;
    content.style.overflow = "visible";
    content.style.whiteSpace = "normal";
    content.style.textOverflow = "initial";
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <ReviewProfile />
        <div className="mb-3 mr-3 mt-4">
          <EditButton />
        </div>
      </div>
      <ReviewImage />
      <div className="mt-2 flex items-center justify-between">
        <LikeButton />
        <DateCreated />
      </div>
      <div className="mt-3 flex items-center justify-between pl-5 pr-5 text-sm">
        <div className="flex items-center gap-1">
          <span className="min-w-fit">맛</span>
          <RatingStar />
        </div>
        <div className="flex items-center gap-1">
          <span className="min-w-fit">위생</span>
          <RatingStar />
        </div>
        <div className="flex items-center gap-1">
          <span className="min-w-fit">친절</span>
          <RatingStar />
        </div>
      </div>
      <div className="flex w-full justify-between px-5 pt-4 text-sm">
        <p id="content" className="overflow-hidden text-clip whitespace-nowrap">
          오늘 여기 식당에서 점심 먹었는데 제육덮밥 맛있었어요! 헌법개정안은
          국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의
          투표와 투표자 과반수의 찬성을 얻어야 한다.
        </p>
        <button
          onClick={handleSeeMore}
          className="min-w-fit cursor-pointer text-subGray"
        >
          <span>...&nbsp; 더 보기</span>
        </button>
      </div>
      <div className="mb-6 px-5 pt-2 text-sm text-subGray">
        <button>
          <a href="/comment">댓글 0개 보기</a>
        </button>
      </div>
    </>
  );
}
