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
    profileImagePath: string;
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
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [data, setData] = useState<ReviewDetailResponse | null>(null);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  // const [isSameUser, setIsSameUser] = useState<boolean>(false);
  const currentReviewId = window.location.hash.substring(1);

  // TODO: 현재 리뷰의 userId와 로컬스토리지의 id???가 일치하는지 확인하고 EditButton 표시
  //       로컬스토리지에는 토큰만 들어있어서 본인의 id를 알 수가 없음!

  const handleCommentCount = (count: number) => {
    setCommentCount(count);
  };

  const getData = async () => {
    try {
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
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("리뷰상세 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return imgUrls.length !== 0 ? (
    <div className="pb-16">
      <div className="flex items-center justify-between">
        <ReviewProfile
          userId={data?.user.id}
          nickName={data?.user.nickName}
          placeName={data?.placeName}
          profileImagePath={data?.user.profileImagePath}
        />
        <div className="mb-3 mr-3 mt-4">
          <EditButton currentReviewId={currentReviewId} />
        </div>
      </div>
      <ReviewImage imgUrls={imgUrls} />
      <div className="mt-2 flex items-center justify-between">
        <LikeButton
          isLiked={isLiked}
          setIsLiked={setIsLiked}
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
          댓글 {commentCount}개 보기
        </button>
        <dialog id="commentModal" className="modal modal-bottom text-black">
          <CommentModal handleCommentCount={handleCommentCount} />
        </dialog>
      </div>
    </div>
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
