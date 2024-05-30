import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PerfectScrollar from "react-perfect-scrollbar";
import FormData from "form-data";
import { RatingStar, ImageInput } from "@/components/review/index";
import axiosClient from "@/utils/baseUrl";
import Toast from "@/components/common/Toast";
import { useAtom } from "jotai";
import { userIdAtom } from "@/components/atom/userId";

const ReviewEdit = () => {
  const [loginUserId] = useAtom(userIdAtom);
  const [postImgs, setPostImgs] = useState<File[]>([]);
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [showNoPhotoToast, setShowNoPhotoToast] = useState<boolean>(false);
  const [showTooManyPhotosToast, setShowTooManyPhotosToast] =
    useState<boolean>(false);
  const [showNoTextToast, setShowNoTextToast] = useState<boolean>(false);
  const [isImgChanged, setIsImgChanged] = useState<boolean>(false);
  const [beforeImgUrls, setBeforeImgUrls] = useState<string[]>([]);

  const { reviewId: currentReviewId } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axiosClient.get(`/reviews/${currentReviewId}`);
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
      setBeforeImgUrls(filePaths);
    } catch (error) {
      console.error("리뷰수정 get요청 에러", error);
    }
  };

  const appendFormData = (formData: FormData) => {
    // 평균 별점 계산
    const sum = tasteRating + hygieneRating + kindnessRating;
    const averageRating = Math.round((sum / 3) * 100) / 100;

    // reviewRequest 데이터 추가
    const reviewUpdateRequest = {
      userId: loginUserId,
      content: content,
      tasteRating: tasteRating,
      hygieneRating: hygieneRating,
      kindnessRating: kindnessRating,
      averageRating: averageRating,
      imageModified: isImgChanged,
    };

    // formData에 파일 항목이 없으면 원래 이미지를 그대로 쓴다
    // formData에 파일이 있으면 원래 이미지를 삭제하고 새로운 이미지로 대체
    if (isImgChanged) {
      for (let i = 0; i < postImgs.length; i++) {
        formData.append("file", postImgs[i]);
      }
    } else {
      formData.append(
        "file",
        new Blob([JSON.stringify([])], {
          type: "image/png",
        })
      );
    }
    formData.append(
      "reviewUpdateRequest",
      new Blob([JSON.stringify(reviewUpdateRequest)], {
        type: "application/json",
      })
    );
  };

  const handleSubmit = async () => {
    const formData: FormData = new FormData();
    appendFormData(formData);

    try {
      await axiosClient.put(`/reviews/${currentReviewId}`, formData);
      navigate(`/detail/${currentReviewId}`);
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PerfectScrollar>
      <div className="pb-16">
        <div className="mb-6 ml-5 mt-4 text-lg font-medium">리뷰 수정하기</div>
        <form className="flex flex-col items-center justify-center gap-1">
          <div className="flex justify-center">
            <ImageInput
              beforeImgUrls={beforeImgUrls}
              previewImgs={previewImgs}
              setPreviewImgs={setPreviewImgs}
              postImgs={postImgs}
              setPostImgs={setPostImgs}
              setIsImgChanged={setIsImgChanged}
              type="edit"
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
              if (isImgChanged && postImgs.length === 0) {
                setShowNoPhotoToast(true);
                return;
              }
              if (postImgs.length > 5) {
                setShowTooManyPhotosToast(true);
                return;
              }
              if (!content) {
                setShowNoTextToast(true);
                return;
              }
              handleSubmit();
            }}
            className="btn btn-sm mt-2 w-1/2 bg-mainY font-medium text-YbtnText"
          >
            리뷰 수정
          </button>
        </form>
        {showNoPhotoToast && (
          <Toast
            setToast={setShowNoPhotoToast}
            message="사진을 1장 이상 첨부해주세요."
          />
        )}
        {showTooManyPhotosToast && (
          <Toast
            setToast={setShowTooManyPhotosToast}
            message="사진은 5장 이하로 첨부해주세요."
          />
        )}
        {showNoTextToast && (
          <Toast
            setToast={setShowNoTextToast}
            message="리뷰 내용을 입력해주세요."
          />
        )}
      </div>
    </PerfectScrollar>
  );
};

export default ReviewEdit;
