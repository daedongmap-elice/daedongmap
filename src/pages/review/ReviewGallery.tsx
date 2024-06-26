import { Select, Logo, Thumbnail } from "@/components/review/index";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/type/types";
import axiosClient from "@/utils/baseUrl";
import { Sort, Category, Region } from "@/components/review/constants";

interface ReviewGalleryProps {
  type?: "myPage";
  myPageData?: ReviewResponse[];
}

const ReviewGallery = ({ type, myPageData }: ReviewGalleryProps) => {
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("최신순");
  const [category, setCategory] = useState<string>("한식");
  const [region, setRegion] = useState<string>("서울");
  const [isDataLengthZero, setIsDataLengthZero] = useState<boolean>(false);

  const handleSort = (option: string) => {
    setSort(option);
  };
  const handleCategory = (option: string) => {
    setCategory(option);
  };
  const handleRegion = (option: string) => {
    setRegion(option);
  };

  const getData = async () => {
    try {
      const ids: number[] = [];
      const firstFiles: string[] = [];

      const response = await axiosClient.get(
        `/reviews/filter?region=${region}&category=${category}&sort=${sort}`
      );
      if (response.data.length === 0) {
        setIsDataLengthZero(true);
      }

      // response에서 썸네일url, reviewId 추출 후 Thumbnail컴포넌트로 전달
      response.data.forEach((review: ReviewResponse) => {
        firstFiles.push(review.reviewImageDtoList?.[0]?.filePath);
        ids.push(review.id);
      });
      setReviewIds(ids);
      setImgUrls(firstFiles);
    } catch (error) {
      console.error("리뷰갤러리 get요청 에러", error);
    }
  };

  const putMyPageData = (myData: ReviewResponse[]) => {
    const ids: number[] = [];
    const firstFilePaths: string[] = [];

    myData.forEach((review: ReviewResponse) => {
      firstFilePaths.push(review.reviewImageDtoList?.[0]?.filePath);
      ids.push(review.id);
    });
    if (myData.length === 0) {
      setIsDataLengthZero(true);
    }
    setReviewIds(ids);
    setImgUrls(firstFilePaths);
  };

  useEffect(() => {
    if (typeof type === "undefined") {
      getData();
    }
    if (type === "myPage") {
      if (!myPageData) {
        return;
      }
      putMyPageData(myPageData);
    }
  }, [sort, category, region, myPageData]);

  return (
    <div className="pb-16">
      {type !== "myPage" && (
        <div className="mb-1 flex justify-between">
          <Logo />
          <div>
            <Select option={Sort} handler={handleSort} />
            <Select option={Category} handler={handleCategory} />
            <Select option={Region} handler={handleRegion} />
          </div>
        </div>
      )}
      {imgUrls.length !== 0 ? (
        <Thumbnail reviewIds={reviewIds} imgUrls={imgUrls} />
      ) : isDataLengthZero ? (
        <div className="mt-12 text-center text-subGray">
          등록된 리뷰가 없습니다.
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
