import {
  RatingStar,
  ImageInput,
  FindPlaceModal,
} from "@/components/review/index";
import { useEffect, useState } from "react";
import FormData from "form-data";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewPost = () => {
  const [postImgs, setPostImgs] = useState<File[]>([]);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");
  const [loginUserId, setLoginUserId] = useState<number>(0);
  const [place, setPlace] = useState<
    | {
        kakaoPlaceId: number;
        placeName: string;
        placeUrl: string;
        categoryName: string;
        addressName: string;
        roadAddressName: string;
        phone: string | null;
        x: number;
        y: number;
      }
    | undefined
  >(undefined);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePostImgs = (imgs: File[]) => {
    setPostImgs(imgs);
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

  const appendFormData = (formData: FormData) => {
    // 평균 별점 계산
    const sum = tasteRating + hygieneRating + kindnessRating;
    const averageRating = Math.round((sum / 3) * 100) / 100;

    // reviewRequest 데이터 추가
    const reviewRequest = {
      userId: loginUserId,
      content: content,
      tasteRating: tasteRating,
      hygieneRating: hygieneRating,
      kindnessRating: kindnessRating,
      averageRating: averageRating,
    };

    // placeRequest 데이터 추가 (FindPlaceModal 컴포넌트에서 선택된 음식점 정보)
    const placeRequest = place;

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
    // if (!place?.kakaoPlaceId) {
    //   alert("음식점 정보를 선택해주세요.");
    //   return;
    // }

    const formData: FormData = new FormData();
    appendFormData(formData);

    try {
      await axios.post("http://35.232.243.53:8080/api/reviews", formData, {
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

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <div className="pb-16">
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">새 리뷰 등록하기</div>
      <form className="flex flex-col items-center justify-center gap-1">
        <div className="flex justify-center">
          <ImageInput prevImgUrls={[]} handlePostImgs={handlePostImgs} />
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
          // @ts-expect-error NOTE: DaisyUI의 Modal 사용을 위함
          onClick={() => document.getElementById("placeModal").showModal()}
        >
          {place === undefined ? "음식점 선택" : place.placeName}
        </button>
        <dialog id="placeModal" className="modal modal-bottom">
          <FindPlaceModal setPlace={setPlace} />
        </dialog>
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
  );
};

export default ReviewPost;
