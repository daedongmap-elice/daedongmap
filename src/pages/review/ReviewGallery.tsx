import { Select, Logo, Thumbnail } from "@/components/review/index";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/type/types";

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
      const customAxios = axios.create({});

      const response = await customAxios.get(
        `http://35.232.243.53:8080/api/reviews/filter?region=${region}&category=${category}&sort=${sort}`
      );

      // response에서 이미지url, reviewId 추출
      response.data.forEach((review: ReviewResponse) => {
        firstFiles.push(review.reviewImageDtoList?.[0]?.filePath);
        ids.push(review.id);
      });
      if (response.data.length === 0) {
        setIsDataLengthZero(true);
      }
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
    getData();
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
              optionName={["최신순", "별점순", "인기리뷰순", "인기음식점순"]}
              optionValue={["최신", "별점순", "인기리뷰순", "인기음식점순"]}
              handler={handleSort}
            />
            <Select
              optionName={[
                "한식",
                "일식",
                "양식",
                "중식",
                "아시안",
                "뷔페",
                "기사식당",
                "술집",
                "간식",
                "분식",
                "퓨전요리",
                "카페",
              ]}
              optionValue={[
                "한식",
                "일식",
                "양식",
                "중식",
                "아시안",
                "뷔페",
                "기사식당",
                "술집",
                "간식",
                "분식",
                "퓨전요리",
                "카페",
              ]}
              handler={handleCategory}
            />
            <Select
              optionName={[
                "서울",
                "경기",
                "부산",
                "대구",
                "인천",
                "광주",
                "대전",
                "울산",
                "충북",
                "충남",
                "전북",
                "전남",
                "경북",
                "경남",
                "강원",
                "제주",
              ]}
              optionValue={[
                "서울",
                "경기",
                "부산",
                "대구",
                "인천",
                "광주",
                "대전",
                "울산",
                "충북",
                "충남",
                "전북",
                "전남",
                "경북",
                "경남",
                "강원",
                "제주",
              ]}
              handler={handleRegion}
            />
          </div>
        </div>
      )}
      {imgUrls.length !== 0 ? (
        <div className="grid grid-cols-3 gap-px">
          <Thumbnail reviewIds={reviewIds} imgUrls={imgUrls} />
        </div>
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
