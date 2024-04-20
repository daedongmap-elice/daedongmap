import EditButton from "../../components/review/EditButton";
import ReviewPhoto from "../../components/review/ReviewDetail/ReviewPhoto";
import LikeButton from "../../components/review/ReviewDetail/LikeButton";
import DateCreated from "../../components/review/DateCreated";
import RatingStar from "../../components/review/RatingStar";
import ReviewProfile from "../../components/review/ReviewDetail/ReviewProfile";

export default function ReviewDetail() {
  function handleSeeMore() {
    console.log("더 보기 버튼 클릭됨");
    return;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <ReviewProfile />
        <div className="mt-4 mb-3 mr-3">
          <EditButton />
        </div>
      </div>
      <ReviewPhoto />
      <div className="flex justify-between items-center mt-2">
        <LikeButton />
        <DateCreated />
      </div>
      <div className="flex justify-between items-center mt-3 pl-5 pr-5 text-sm">
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
      <div className="flex justify-between px-5 pt-4 text-sm w-full">
        <p
          id="content"
          className="overflow-hidden text-ellipsis whitespace-nowrap"
        >
          오늘 여기 식당에서 점심 먹었는데 제육덮밥 맛있었어요! 헌법개정안은
          국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의
          투표와 투표자 과반수의 찬성을 얻어야 한다.
        </p>
        <span className="text-subGray min-w-fit">
          <button onClick={handleSeeMore}>더 보기</button>
        </span>
      </div>
      <div className="text-subGray text-sm px-5 pt-2">
        <button>댓글 0개 보기</button>
      </div>
    </>
  );
}
