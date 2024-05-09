import {
  RatingStar,
  ImageInput,
  FindPlaceModal,
} from "@/components/review/index";
import { useEffect, useState } from "react";
import FormData from "form-data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewEdit = () => {
  const [loginUserId, setLoginUserId] = useState<number>(0);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [prevImgUrls, setPrevImgUrls] = useState<string[]>([]);
  const [postImgs, setPostImgs] = useState<File[]>([]);
  const [isImgChanged, setIsImgChanged] = useState<boolean>(false);
  const [place, setPlace] = useState<{
    kakaoPlaceId: number;
    placeName: string;
    placeUrl: string;
    categoryName: string;
    addressName: string;
    roadAddressName: string;
    phone: string;
    x: number;
    y: number;
  }>({
    kakaoPlaceId: 0,
    placeName: "",
    placeUrl: "",
    categoryName: "",
    addressName: "",
    roadAddressName: "",
    phone: "",
    x: 0,
    y: 0,
  });

  const currentReviewId = window.location.hash.substring(1);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://35.232.243.53:8080/api/reviews/${currentReviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    } catch (error) {
      console.error("리뷰수정 get요청 에러", error);
    }
  };

  const getUserId = async () => {
    try {
      const response = await axios.post(
        "http://35.232.243.53:8080/api/user",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoginUserId(response.data);
    } catch (error) {
      console.error("로그인 유저id 요청 에러:", error);
    }
  };

  const handlePostImgs = (imgs: File[]) => {
    setPostImgs(imgs);
    setIsImgChanged(true);
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

    const placeRequest = place;

    // formData에 파일 항목이 없으면 원래 이미지를 그대로 쓴다
    // formData에 파일이 있으면 원래 이미지를 삭제하고 새로운 이미지로 대체
    if (isImgChanged) {
      for (let i = 0; i < postImgs.length; i++) {
        formData.append("file", postImgs[i]);
      }
    } else {
      // formData.append("file", []);
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
    formData.append(
      "placeRequest",
      new Blob([JSON.stringify(placeRequest)], { type: "application/json" })
    );
  };

  const handleSubmit = async () => {
    if (isImgChanged && postImgs.length === 0) {
      alert("사진을 1장 이상 첨부해주세요.");
      return;
    }
    if (postImgs.length > 5) {
      alert("사진은 5장 이하로 첨부해주세요");
      return;
    }
    if (!content) {
      alert("본문 내용을 입력해주세요.");
      return;
    }

    const formData: FormData = new FormData();
    appendFormData(formData);
    console.log("isImgChanged:", isImgChanged);
    console.log("Edit-loginUserId:", loginUserId);

    try {
      await axios.put(
        `http://35.232.243.53:8080/api/reviews/${currentReviewId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/detail#${currentReviewId}`);
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    }
  };

  useEffect(() => {
    getData();
    getUserId();
  }, []);

  return (
    <div className="pb-16">
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">리뷰 수정하기</div>
      <form className="flex flex-col items-center justify-center gap-1">
        <div className="flex justify-center">
          <ImageInput
            prevImgUrls={prevImgUrls}
            postImgs={postImgs}
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
        {/* 리뷰 수정 요청에 placeRequest 필요없으면 dialog 삭제할 것(eslint setPlace never used 에러 때문) */}
        <dialog>
          <FindPlaceModal setPlace={setPlace} />
        </dialog>
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
          리뷰 수정
        </button>
      </form>
    </div>
  );
};

export default ReviewEdit;
