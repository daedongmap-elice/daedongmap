import { Select, Logo, Thumbnail } from "@/components/review/index";
import axios from "axios";
import { useEffect, useState } from "react";

interface ReviewGalleryResponse {
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
  reviewImageList: [
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

const ReviewGallery = () => {
  // const [data, setData] = useState<ReviewGalleryResponse[] | null>(null);
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://35.232.243.53:8080/api/reviews");
      // setData(response.data);

      const ids: number[] = [];
      const firstFilePaths: string[] = [];

      // response로부터 썸네일이미지url, reviewId 추출
      response.data.forEach((review: ReviewGalleryResponse) => {
        firstFilePaths.push(review.reviewImageList?.[0].filePath);
        ids.push(review.id);
      });

      setReviewIds(ids);
      setImgUrls(firstFilePaths);
    } catch (error) {
      console.error("리뷰갤러리 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pb-16">
      <div className="mb-1 flex justify-between">
        <Logo />
        <div>
          <Select items={["추천순", "인기순", "최신순"]} />
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
      <div className="grid grid-cols-3 gap-px">
        <Thumbnail reviewIds={reviewIds} imgUrls={imgUrls} />
      </div>
    </div>
  );
};

export default ReviewGallery;
