import { Select, Logo, Thumbnail } from "@/components/review/index";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReviewGalleryResponse } from "@/type/types";

interface ReviewGalleryProps {
  type?: "myPage";
  myPageData?: ReviewGalleryResponse[];
}

const ReviewGallery = ({ type, myPageData }: ReviewGalleryProps) => {
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const getData = async () => {
    try {
      const ids: number[] = [];
      const firstFilePaths: string[] = [];
      // 리뷰 전체 조회
      const response = await axios.get("http://35.232.243.53:8080/api/reviews");

      // response로부터 썸네일이미지url, reviewId 추출
      response.data.forEach((review: ReviewGalleryResponse) => {
        firstFilePaths.push(review.reviewImageList?.[0]?.filePath);
        ids.push(review.id);
      });

      setReviewIds(ids);
      setImgUrls(firstFilePaths);
    } catch (error) {
      console.error("리뷰갤러리 get요청 에러", error);
    }
  };

  const putMyPageData = (myData: ReviewGalleryResponse[]) => {
    const ids: number[] = [];
    const firstFilePaths: string[] = [];
    myData.forEach((review: ReviewGalleryResponse) => {
      firstFilePaths.push(review.reviewImageList?.[0]?.filePath);
      ids.push(review.id);
    });
    setReviewIds(ids);
    setImgUrls(firstFilePaths);
  };

  useEffect(() => {
    if (typeof type === "undefined") {
      getData();
    }
    if (type === "myPage") {
      if (!myPageData) {
        console.log("피드 데이터 없음");
        return;
      }
      putMyPageData(myPageData);
    }
  }, [myPageData]);

  return (
    <div className="pb-16">
      {type === "myPage" && (
        <div className="mb-1 flex justify-between">
          <Logo />
          <div>
            <Select items={["추천순", "인기순", "최신순"]} />
            <Select items={["음식 종류", "한식", "중식", "양식", "기타"]} />
            <Select
              items={[
                "전국",
                "서울",
                "경기도",
                "강원도",
                "충청도",
                "경상도",
                "전라도",
                "제주도",
              ]}
            />
          </div>
        </div>
      )}
      {imgUrls.length !== 0 ? (
        <div className="grid grid-cols-3 gap-px">
          <Thumbnail reviewIds={reviewIds} imgUrls={imgUrls} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-px">
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-full w-full"></div>
          <div className="skeleton h-28 w-full"></div>
        </div>
      )}
    </div>
  );
};

export default ReviewGallery;
