import {
  EditButton,
  ReviewImage,
  LikeButton,
  DateCreated,
  Star,
  ReviewProfile,
  CommentModal,
} from "@/components/review/index";
import { useState } from "react";

export default function ReviewDetail() {
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // TODO: GET요청의 결과를 초기값으로 지정할 것

  // TODO: 리뷰 상세 페이지 진입 시 ‘나의 좋아요 클릭 여부’와 '해당 리뷰의 좋아요 개수'를 조회(GET) 후
  //       반영 - isLiked 여부, N명이 좋아합니다
  //       좋아요 버튼을 클릭하면 isLiked의 여부를 전환하며 서버에 POST 또는 DELETE 요청보내기

  // TODO: ReviewProfile 클릭하면 '마이페이지'로 넘어가서 '사용자별 리뷰 조회'하도록 해야 함
  // TODO: EditButton 클릭 시 ReviewEdit으로 가야 함
  const p = document.querySelector("p");
  console.log(p?.style.textOverflow);

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between">
        <ReviewProfile />
        <div className="mb-3 mr-3 mt-4">
          <EditButton />
        </div>
      </div>
      <ReviewImage />
      <div className="mt-2 flex items-center justify-between">
        <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
        <DateCreated />
      </div>
      <div className="mt-3 flex items-center justify-between pl-5 pr-5 text-sm">
        <div className="flex items-center gap-1">
          <span className="min-w-fit">맛</span>
          <Star name="taste" rating={3} />
        </div>
        <div className="flex items-center gap-1">
          <span className="min-w-fit">위생</span>
          <Star name="hygiene" rating={4} />
        </div>
        <div className="flex items-center gap-1">
          <span className="min-w-fit">친절</span>
          <Star name="kindness" rating={5} />
        </div>
      </div>
      <div className="flex w-full justify-between px-5 pt-4 text-sm">
        <p
          className={`overflow-${isSeeMoreClicked ? "visible" : "hidden"} whitespace-${isSeeMoreClicked ? "normal" : "nowrap"} ${isSeeMoreClicked ? "" : "text-clip"}`}
        >
          오늘 여기 식당에서 점심 먹었는데 제육덮밥 맛있었어요! 헌법개정안은
          국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의
          투표와 투표자 과반수의 찬성을 얻어야 한다.
        </p>

        <button
          onClick={() => setIsSeeMoreClicked(true)}
          className={`min-w-fit cursor-pointer text-subGray ${isSeeMoreClicked ? "hidden" : ""}`}
        >
          <span>...&nbsp; 더 보기</span>
        </button>
      </div>
      <div className="mb-6 px-5 pt-2 text-sm text-subGray">
        <button
          // @ts-expect-error NOTE: DaisyUI의 Modal 사용을 위함
          onClick={() => document.getElementById("commentModal").showModal()}
        >
          댓글 0개 보기
        </button>
        <dialog id="commentModal" className="modal modal-bottom text-black">
          <CommentModal />
        </dialog>
      </div>
    </div>
  );
}
