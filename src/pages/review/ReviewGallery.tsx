import { Select, Logo, Thumbnail } from "@/components/review/index";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/type/types";
import axiosClient from "@/utils/baseUrl";

interface ReviewGalleryProps {
  type?: "myPage";
  myPageData?: ReviewResponse[];
}

const ReviewGallery = ({ type, myPageData }: ReviewGalleryProps) => {
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  // const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
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

      // response에서 이미지url, reviewId 추출 후 Thumbnail컴포넌트로 전달
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
    console.log(type);
  }, [type]);

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
            <Select
              option={[
                { name: "최신순", value: "최신" },
                { name: "별점순", value: "별점순" },
                { name: "인기리뷰순", value: "인기리뷰순" },
                { name: "인기음식점순", value: "인기음식점순" },
              ]}
              handler={handleSort}
            />
            <Select
              option={[
                { name: "한식", value: "한식" },
                { name: "일식", value: "일식" },
                { name: "양식", value: "양식" },
                { name: "중식", value: "중식" },
                { name: "아시안", value: "아시안" },
                { name: "뷔페", value: "뷔페" },
                { name: "기사식당", value: "기사식당" },
                { name: "술집", value: "술집" },
                { name: "간식", value: "간식" },
                { name: "분식", value: "분식" },
                { name: "퓨전요리", value: "퓨전요리" },
                { name: "카페", value: "카페" },
              ]}
              handler={handleCategory}
            />
            <Select
              option={[
                { name: "서울", value: "서울" },
                { name: "경기", value: "경기" },
                { name: "부산", value: "부산" },
                { name: "대구", value: "대구" },
                { name: "인천", value: "인천" },
                { name: "광주", value: "광주" },
                { name: "대전", value: "대전" },
                { name: "울산", value: "울산" },
                { name: "충북", value: "충북" },
                { name: "충남", value: "충남" },
                { name: "전북", value: "전북" },
                { name: "전남", value: "전남" },
                { name: "경북", value: "경북" },
                { name: "경남", value: "경남" },
                { name: "강원", value: "강원" },
                { name: "제주", value: "제주" },
              ]}
              handler={handleRegion}
            />
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
