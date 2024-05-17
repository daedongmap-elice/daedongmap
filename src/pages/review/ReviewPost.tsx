import {
  RatingStar,
  ImageInput,
  FindPlaceModal,
} from "@/components/review/index";
import { useState } from "react";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import { PlaceInfoData } from "@/type/types";
import PerfectScrollar from "react-perfect-scrollbar";
import axiosClient from "@/utils/baseUrl";

const ReviewPost = () => {
  const [postImgs, setPostImgs] = useState<File[]>([]);
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);
  const [isImgChanged, setIsImgChanged] = useState<boolean>(false);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");
  const [place, setPlace] = useState<PlaceInfoData | undefined>(undefined);
  const [isShowPlaceModal, setIsShowPlaceModal] = useState<boolean>(false);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  console.log(isImgChanged);

  const handleSetIsShowPlaceModal = (bool: boolean) => {
    setIsShowPlaceModal(bool);
  };

  const appendFormData = (formData: FormData) => {
    // 평균 별점 계산
    const sum = tasteRating + hygieneRating + kindnessRating;
    const averageRating = Math.round((sum / 3) * 100) / 100;

    // reviewRequest 데이터 추가
    const reviewRequest = {
      content: content,
      tasteRating: tasteRating,
      hygieneRating: hygieneRating,
      kindnessRating: kindnessRating,
      averageRating: averageRating,
    };

    // placeRequest 데이터 추가 (FindPlaceModal 컴포넌트에서 선택된 음식점 정보)
    const placeRequest = place;
    console.log("placeRequest:", placeRequest);
    console.log("reviewRequest:", reviewRequest);

    // formData.append("file", postImgs);
    for (let i = 0; i < postImgs.length; i++) {
      formData.append("file", postImgs[i]);
    }
    formData.append(
      "reviewRequest",
      new Blob([JSON.stringify(reviewRequest)], { type: "application/json" })
    );
    formData.append(
      "placeRequest",
      new Blob([JSON.stringify(placeRequest)], { type: "application/json" })
    );
  };

  const handlePreventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (postImgs.length === 0) {
      alert("사진을 1장 이상 첨부해주세요");
      return;
    }
    if (postImgs.length > 5) {
      alert("사진은 5장 이하로 첨부해주세요");
      return;
    }
    if (!content) {
      alert("본문 내용을 입력해주세요");
      return;
    }
    if (!place?.kakaoPlaceId) {
      alert("음식점 정보를 선택해주세요.");
      return;
    }

    const formData: FormData = new FormData();
    appendFormData(formData);

    try {
      await axiosClient.post("/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/review");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  return (
    <PerfectScrollar>
      <div className="pb-16">
        <div className="mb-6 ml-5 mt-4 text-lg font-medium">
          새 리뷰 등록하기
        </div>
        <form
          className="flex flex-col items-center justify-center gap-1"
          onSubmit={(e) => handlePreventSubmit(e)}
        >
          <div className="flex justify-center">
            <ImageInput
              beforeImgUrls={[]}
              previewImgs={previewImgs}
              setPreviewImgs={setPreviewImgs}
              postImgs={postImgs}
              setPostImgs={setPostImgs}
              setIsImgChanged={setIsImgChanged}
              type="post"
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
          <button
            type="button"
            className="btn btn-outline btn-sm mb-2 w-3/4 max-w-xs flex-col items-baseline border-gray-300 text-xs font-normal"
            onClick={() => handleSetIsShowPlaceModal(true)}
          >
            {place === undefined ? "음식점 선택" : place.placeName}
          </button>
          <FindPlaceModal
            setPlace={setPlace}
            isShowPlaceModal={isShowPlaceModal}
            handleSetIsShowPlaceModal={handleSetIsShowPlaceModal}
          />
          <textarea
            required
            className="textarea textarea-bordered h-32 w-3/4 max-w-xs pt-3 text-xs"
            placeholder="리뷰 내용 입력..."
            onChange={(e) => setContent(e.target.value)}
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
    </PerfectScrollar>
  );
};

export default ReviewPost;
