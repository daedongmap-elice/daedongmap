import {
  RatingStar,
  ImageInput,
  FindPlaceModal,
} from "@/components/review/index";
import { useState } from "react";
import axios from "axios";

export default function ReviewPost() {
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);
  const [postImgs, setPostImgs] = useState<string[]>([]);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");

  // TODO: place api와 riview api에 각 데이터 전송
  // TODO: 음식점 선택 모달 띄우고 지도에서 마커 선택 시 정보를 서버로 넘기기
  // TODO: ImageInput에서 이미지 크롭 기능(시간 되면)

  const handleSubmit = async () => {
    // 평균 별점 계산
    const sum = tasteRating + hygieneRating + kindnessRating;
    const averageRating = Math.round((sum / 3) * 100) / 100;

    // 음식점 등록
    // 음식점의 id를 리뷰 등록의 placeId에 넣어서 보내기. 바뀔수도있음
    try {
      const response = await axios.post(
        "http://35.232.243.53:8080/api/place",
        {
          kakaoPlaceId: 0, // 음식점 중복 체크
          placeName: "string",
          placeUrl: "string",
          categoryName: "string",
          addressName: "string",
          roadAddressName: "string",
          phone: "string",
          x: 0,
          y: 0,
        },
        { withCredentials: true }
      );
      console.log("음식점 등록 성공:", response.data);
    } catch (error) {
      console.error("음식점 등록 실패:", error);

      // 리뷰 등록
      try {
        const response = await axios.post(
          "http://35.232.243.53:8080/api/review",
          {
            file: postImgs,
            request: {
              userId: 0,
              kakaoPlaceId: 0,
              content: content,
              tasteRating: tasteRating,
              hygieneRating: hygieneRating,
              kindnessRating: kindnessRating,
              averageRating: averageRating,
            },
          },
          { withCredentials: true }
        );
        console.log("리뷰 등록 성공:", response.data);
      } catch (er) {
        console.error("리뷰 등록 실패:", er);
      }
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">새 리뷰 등록하기</div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex justify-center">
          <ImageInput
            previewImgs={previewImgs}
            setPreviewImgs={setPreviewImgs}
            setPostImgs={setPostImgs}
          />
        </div>
        <div className="mt-1 flex flex-col items-center justify-center gap-2 pl-5 pr-5 text-xs">
          <div className="mb-0.5 flex items-center gap-1">
            <span className="min-w-6 text-center">맛</span>
            <RatingStar name="taste" setRating={setTasteRating} />
          </div>
          <div className="mb-0.5 flex items-center gap-1">
            <span className="min-w-6">위생</span>
            <RatingStar name="hygiene" setRating={setHygieneRating} />
          </div>
          <div className="mb-3 flex items-center gap-1">
            <span className="min-w-6">친절</span>
            <RatingStar name="kindness" setRating={setKindnessRating} />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm mb-2 w-3/4 max-w-xs flex-col items-baseline border-gray-300 text-xs font-normal"
          // @ts-expect-error NOTE: DaisyUI의 Modal 사용을 위함
          onClick={() => document.getElementById("placeModal").showModal()}
        >
          음식점 선택
        </button>
        <dialog id="placeModal" className="modal modal-bottom">
          <FindPlaceModal />
        </dialog>
        <select
          required
          className="select select-bordered select-sm mb-2 w-3/4 max-w-xs text-xs"
        >
          <option disabled defaultValue="default">
            분류 선택
          </option>
          <option value="korean">한식</option>
          <option value="chinese">중식</option>
          <option value="japanese">일식</option>
          <option value="Western">양식</option>
          <option value="other">기타</option>
        </select>
        <textarea
          required
          className="textarea textarea-bordered h-32 w-3/4 max-w-xs pt-3 text-xs"
          placeholder="리뷰 내용 입력..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="btn btn-sm mt-2 w-1/2 bg-mainY font-medium text-YbtnText"
        >
          리뷰 등록
        </button>
      </div>
    </div>
  );
}
