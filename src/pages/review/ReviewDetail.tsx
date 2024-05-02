import {
  EditButton,
  ReviewImage,
  LikeButton,
  DateCreated,
  Star,
  ReviewProfile,
  CommentModal,
} from "@/components/review/index";
import { useEffect, useState } from "react";
import axios from "axios";

interface ReviewDetailResponse {
  id: number;
  kakaoPlaceId: number;
  placeName: string;
  user: {
    id: number;
    nickName: string;
    email: string;
  };
  content: string;
  reviewImageDtoList: [
    {
      id: number;
      userId: number;
      reviewId: number;
      filePath: string;
    },
  ];
  tasteRating: number;
  hygieneRating: number;
  kindnessRating: number;
  averageRating: number;
  likeCount: number;
  createdAt: string | undefined;
  updatedAt: string;
}

// TODO: 페이지 진입 시 /api/review/detail과 /api/like에 get요청
//       데이터 받아서 ReviewProfile, ReviewImage, DateCreated, Star에 뿌리기
const ReviewDetail = () => {
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // TODO: GET요청의 결과를 초기값으로 지정
  const [data, setData] = useState<ReviewDetailResponse | null>(null);
  const [fileLinks, setFileLinks] = useState<string[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://35.232.243.53:8080/api/reviews/4"
      );
      setData(response.data);
      const filePaths = response.data.reviewImageDtoList.map(
        (imageDto: {
          id: number;
          userId: number;
          reviewId: number;
          filePath: string;
        }) => imageDto.filePath
      );
      setFileLinks(filePaths);
    } catch (error) {
      console.error("리뷰상세 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // TODO: ReviewProfile 클릭 시 해당 유저의 '마이페이지'로 이동
  // TODO: EditButton 클릭 시 ReviewEdit으로 가야 함

  // TODO: EditButton에서 수정 버튼 클릭 시 현재 리뷰아이디를 ReviewEdit에 전달하기
  // TODO: EditButton에서 삭제 버튼 클릭 시 현재 리뷰아이디로 delete요청 보내기
  //      '리뷰를 삭제하시겠습니까?' 모달 띄우고 확인/취소 버튼
  // TODO: 로그인되어있는 userID와 현재 글의 userID가 일치할 경우에만 EditButton 표시

  // TODO: 페이지 진입 시 ‘나의 좋아요 클릭 여부’와 '해당 리뷰의 좋아요 개수'를 조회(GET) 후
  //       반영 - isLiked 여부, N명이 좋아합니다
  //       좋아요 버튼을 클릭하면 isLiked의 여부를 전환하며 서버에 POST 또는 DELETE 요청보내기

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between">
        <ReviewProfile
          userId={data?.user.id}
          nickName={data?.user.nickName}
          placeName={data?.placeName}
        />
        <div className="mb-3 mr-3 mt-4">
          <EditButton />
        </div>
      </div>
      <ReviewImage fileLinks={fileLinks} />
      <div className="mt-2 flex items-center justify-between">
        <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
        <DateCreated createdAt={data?.createdAt} />
      </div>
      <div className="mt-3 flex items-center justify-between pl-5 pr-5 text-sm">
        <div className="flex items-center gap-1">
          <span className="min-w-fit">맛</span>
          <Star name="taste" rating={data?.tasteRating} />
        </div>
        <div className="flex items-center gap-1">
          <span className="min-w-fit">위생</span>
          <Star name="hygiene" rating={data?.hygieneRating} />
        </div>
        <div className="flex items-center gap-1">
          <span className="min-w-fit">친절</span>
          <Star name="kindness" rating={data?.kindnessRating} />
        </div>
      </div>
      <div className="flex w-full justify-between px-5 pt-4 text-sm">
        <p
          className={`${isSeeMoreClicked ? "overflow-visible" : "overflow-hidden"} ${isSeeMoreClicked ? "whitespace-normal" : "whitespace-nowrap"} ${isSeeMoreClicked ? "" : "text-clip"}`}
        >
          {data?.content}
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
};

export default ReviewDetail;
