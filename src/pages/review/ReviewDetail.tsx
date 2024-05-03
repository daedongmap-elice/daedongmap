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

const ReviewDetail = () => {
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // TODO: GET요청의 결과를 초기값으로 지정
  const [data, setData] = useState<ReviewDetailResponse | null>(null);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const getData = async () => {
    try {
      const currentReviewId = window.location.hash.substring(1);
      const response = await axios.get(
        `http://35.232.243.53:8080/api/reviews/${currentReviewId}`
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
      setImgUrls(filePaths);
    } catch (error) {
      console.error("리뷰상세 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      <ReviewImage imgUrls={imgUrls} />
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
        {data?.content && data?.content.length >= 110 ? (
          <p
            className={`${isSeeMoreClicked ? "overflow-visible" : "overflow-hidden"} ${isSeeMoreClicked ? "whitespace-normal" : "whitespace-nowrap"} ${isSeeMoreClicked ? "" : "text-clip"}`}
          >
            {data?.content}
          </p>
        ) : (
          <p>{data?.content}</p>
        )}
        {data?.content && data?.content.length >= 110 ? (
          <button
            onClick={() => setIsSeeMoreClicked(true)}
            className={`min-w-fit cursor-pointer text-subGray ${isSeeMoreClicked ? "hidden" : ""}`}
          >
            <span>...&nbsp; 더 보기</span>
          </button>
        ) : (
          <></>
        )}
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
