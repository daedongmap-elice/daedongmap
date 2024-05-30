import {
  ReviewEditBtn,
  ReviewImage,
  LikeBtn,
  DateCreated,
  Star,
  ReviewProfile,
  CommentModal,
} from "@/components/review/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewResponse } from "@/type/types";
import PerfectScrollar from "react-perfect-scrollbar";
import axiosClient from "@/utils/baseUrl";
import { useAtom } from "jotai";
import { userIdAtom } from "@/components/atom/userId";

interface ReviewDetailProps {
  type?: "feed";
  feedData?: ReviewResponse; // path가 "feed"일 때 사용되는 데이터
}

const ReviewDetail = ({ type, feedData }: ReviewDetailProps) => {
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(false); // 내가 좋아요를 눌렀는지 여부
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [loginUserId] = useAtom(userIdAtom);
  const [reviewUserId, setReviewUserId] = useState<number>(0);
  const [reviewId, setReviewId] = useState<number>(0);
  const [data, setData] = useState<ReviewResponse | null>(null);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const { reviewId: currentReviewId } = useParams();

  const putFeedData = (fData: ReviewResponse) => {
    setData(fData);
    setReviewUserId(fData.user.id);
    const filePaths = fData.reviewImageDtoList.map(
      (imageDto: {
        id: number;
        userId: number;
        reviewId: number;
        filePath: string;
      }) => imageDto.filePath
    );
    setImgUrls(filePaths);
    setLikeCount(fData.likeCount);
  };

  const handleIsLiked = (bool: boolean) => {
    setIsLiked(bool);
  };

  const handleCommentCount = (count: number) => {
    setCommentCount(count);
  };

  const getData = async () => {
    try {
      const response = await axiosClient.get(`/reviews/${currentReviewId}`);
      setData(response.data);
      setReviewId(response.data.id);
      setReviewUserId(response.data.user.id);
      const filePaths = response.data.reviewImageDtoList.map(
        (imageDto: {
          id: number;
          userId: number;
          reviewId: number;
          filePath: string;
        }) => imageDto.filePath
      );
      setImgUrls(filePaths);
      setLikeCount(response.data.likeCount);
      setIsLiked(response.data.isLikedByUser);
      setIsLikedByUser(response.data.isLikedByUser);
    } catch (error) {
      console.error("리뷰상세 get요청 에러", error);
    }
  };

  useEffect(() => {
    if (type === undefined) {
      getData();
    }
    if (type === "feed") {
      if (!feedData) {
        return;
      }
      putFeedData(feedData);
    }
  }, [isLiked, commentCount]);

  return imgUrls.length !== 0 ? (
    <PerfectScrollar>
      <div className={type !== "feed" ? `pb-16` : ""}>
        <div className="flex items-center justify-between">
          <ReviewProfile
            userId={data?.user.id}
            nickName={data?.user.nickName}
            placeName={data?.placeName}
            profileImagePath={data?.user.profileImagePath}
          />
          {reviewUserId === loginUserId && (
            <div className="mb-3 mr-3 mt-4">
              <ReviewEditBtn reviewId={reviewId} />
            </div>
          )}
        </div>
        <ReviewImage imgUrls={imgUrls} />
        <div className="mt-2 flex items-center justify-between">
          <LikeBtn
            reviewId={reviewId}
            isLiked={isLiked}
            handleIsLiked={handleIsLiked}
            isLikedByUser={isLikedByUser}
            likeCount={likeCount}
          />
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
              className={`${
                isSeeMoreClicked ? "overflow-visible" : "overflow-hidden"
              } ${
                isSeeMoreClicked ? "whitespace-normal" : "whitespace-nowrap"
              } ${isSeeMoreClicked ? "" : "text-clip"}`}
            >
              {data?.content}
            </p>
          ) : (
            <p>{data?.content}</p>
          )}
          {data?.content && data?.content.length >= 110 ? (
            <button
              onClick={() => setIsSeeMoreClicked(true)}
              className={`min-w-fit cursor-pointer text-subGray ${
                isSeeMoreClicked ? "hidden" : ""
              }`}
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
            댓글 {commentCount}개 보기
          </button>
          <dialog id="commentModal" className="modal modal-bottom text-black">
            <CommentModal
              handleCommentCount={handleCommentCount}
              loginUserId={loginUserId}
            />
          </dialog>
        </div>
      </div>
    </PerfectScrollar>
  ) : (
    <div className="ml-4 mt-4 flex w-11/12 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-16"></div>
        </div>
      </div>
      <div className="skeleton h-80 w-full"></div>
    </div>
  );
};

export default ReviewDetail;
