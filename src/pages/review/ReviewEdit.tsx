import { RatingStar, ImageInput } from "@/components/review/index";
import { useEffect, useState } from "react";
import FormData from "form-data";
import axios from "axios";

// interface ReviewDetailResponse {
//   id: number;
//   kakaoPlaceId: number;
//   placeName: string;
//   user: {
//     id: number;
//     nickName: string;
//     email: string;
//   };
//   content: string;
//   reviewImageDtoList: [
//     {
//       id: number;
//       userId: number;
//       reviewId: number;
//       filePath: string;
//     },
//   ];
//   tasteRating: number;
//   hygieneRating: number;
//   kindnessRating: number;
//   averageRating: number;
//   likeCount: number;
//   createdAt: string | undefined;
//   updatedAt: string;
// }

const ReviewEdit = () => {
  // const [data, setData] = useState<ReviewDetailResponse | null>(null);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [prevImgUrls, setPrevImgUrls] = useState<string[]>([]);
  const [postImgs, setPostImgs] = useState<File[]>([]);
  const currentReviewId = window.location.hash.substring(1);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://35.232.243.53:8080/api/reviews/${currentReviewId}`
      );
      // setData(response.data);
      setTasteRating(response.data.tasteRating);
      setHygieneRating(response.data.hygieneRating);
      setKindnessRating(response.data.kindnessRating);
      setContent(response.data.content);
      setPlaceName(response.data.placeName);
      const filePaths = response.data.reviewImageDtoList.map(
        (imageDto: {
          id: number;
          userId: number;
          reviewId: number;
          filePath: string;
        }) => imageDto.filePath
      );
      setPrevImgUrls(filePaths);
      // setPostImgs(response.data.);
    } catch (error) {
      console.error("리뷰수정 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePostImgs = (imgs: File[]) => {
    setPostImgs(imgs);
  };

  const appendFormData = (formData: FormData) => {
    // 평균 별점 계산
    const sum = tasteRating + hygieneRating + kindnessRating;
    const averageRating = Math.round((sum / 3) * 100) / 100;

    // reviewRequest 데이터 추가
    const reviewRequest = {
      userId: 0,
      content: content,
      tasteRating: tasteRating,
      hygieneRating: hygieneRating,
      kindnessRating: kindnessRating,
      averageRating: averageRating,
    };

    formData.append("file", postImgs);
    formData.append(
      "reviewRequest",
      new Blob([JSON.stringify(reviewRequest)], { type: "application/json" })
    );
  };

  const handleSubmit = async () => {
    console.log(content);
    if (postImgs.length === 0) {
      alert("사진을 1장 이상 첨부해주세요.");
      return;
    }
    if (!content) {
      alert("본문 내용을 입력해주세요.");
      return;
    }

    const formData: FormData = new FormData();
    appendFormData(formData);

    console.log(content);
    // for (const key of formData.keys()) {
    //   console.log(key, ":", formData.get(key));
    // }

    try {
      const response = await axios.post(
        `http://35.232.243.53:8080/api/reviews/${currentReviewId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">리뷰 수정하기</div>
      <form className="flex flex-col items-center justify-center gap-1">
        <div className="flex justify-center">
          <ImageInput
            prevImgUrls={prevImgUrls}
            handlePostImgs={handlePostImgs}
          />
        </div>
        <div className="mt-1 flex flex-col items-center justify-center gap-2 pl-5 pr-5 text-xs">
          <div className="mb-0.5 flex items-center gap-1">
            <span className="min-w-6 text-center">맛</span>
            <RatingStar
              name="taste"
              initialValue={tasteRating}
              setRating={setTasteRating}
            />
          </div>
          <div className="mb-0.5 flex items-center gap-1">
            <span className="min-w-6">위생</span>
            <RatingStar
              name="hygiene"
              initialValue={hygieneRating}
              setRating={setHygieneRating}
            />
          </div>
          <div className="mb-3 flex items-center gap-1">
            <span className="min-w-6">친절</span>
            <RatingStar
              name="kindness"
              initialValue={kindnessRating}
              setRating={setKindnessRating}
            />
          </div>
        </div>
        <input
          type="text"
          placeholder={placeName}
          className="input input-sm input-bordered mb-2 box-border w-3/4 max-w-xs"
          disabled
        />
        <textarea
          required
          className="textarea textarea-bordered box-border h-32 w-3/4 max-w-xs pt-3 text-xs"
          placeholder="리뷰 내용 입력..."
          onChange={(e) => setContent(e.target.value)}
          defaultValue={content}
        ></textarea>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="btn btn-sm mt-2 w-1/2 bg-mainY font-medium text-YbtnText"
        >
          리뷰 등록
        </button>
      </form>
    </div>
  );
};

export default ReviewEdit;
