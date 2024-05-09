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
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
  // const [data, setData] = useState<ReviewGalleryResponse[] | null>(null);
  const [sort, setSort] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [region, setRegion] = useState<string>();

  console.log("sort category region:", sort, category, region);
  console.log("isFilterChanged:", isFilterChanged);

  const handleSort = (option: string) => {
    setSort(option);
    setIsFilterChanged(true);
  };
  const handleCategory = (option: string) => {
    setCategory(option);
    setIsFilterChanged(true);
  };
  const handleRegion = (option: string) => {
    setRegion(option);
    setIsFilterChanged(true);
  };

  const getData = async () => {
    try {
      const ids: number[] = [];
      const firstFilePaths: string[] = [];

      // 리뷰 전체 조회
      // if (!isFilterChanged) {
      const response = await axios.get("http://35.232.243.53:8080/api/reviews");
      // setData(response.data);
      // }
      // if (isFilterChanged) {
      //   const response = await axios.get(
      //     `/api/reviews/filter?region=${region}&category=${category}&sort=${sort}`
      //   );
      //   setData(response.data);
      // }
      // response로부터 썸네일이미지url, reviewId 추출
      response.data?.forEach((review: ReviewGalleryResponse) => {
        firstFilePaths.push(review.reviewImageList?.[0]?.filePath);
        ids.push(review.id);
      });
      console.log("firstFilePaths: ", firstFilePaths);
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
    console.log("imgUrls:", imgUrls);
  }, [imgUrls]);

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
      {type !== "myPage" && (
        <div className="mb-1 flex justify-between">
          <Logo />
          <div>
            <Select
              optionName={["최신순", "별점순", "인기리뷰순", "인기음식점순"]}
              optionValue={["최신순", "별점순", "인기리뷰순", "인기음식점순"]}
              handler={handleSort}
            />
            <Select
              optionName={[
                "음식 종류",
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
                "음식 종류",
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
                "전국",
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
                "전국",
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
