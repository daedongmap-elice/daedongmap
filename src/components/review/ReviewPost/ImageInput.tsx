import { useEffect, useState } from "react";

interface ImageInputProps {
  prevImgUrls: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePostImgs: (Imgs: any) => void;
}

const ImageInput = ({ prevImgUrls, handlePostImgs }: ImageInputProps) => {
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  // TODO: 이미 올라간 이미지를 삭제한 경우, 새로운 이미지들로 대체되어야 함 (post요청))
  //       이미 올라간 이미지를 그대로 둔 경우 변경이 없음 (put?)

  const putPrevImg = () => {
    if (prevImgUrls.length !== 0) {
      setPreviewImgs(prevImgUrls);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // files ==> 서버에 전송할 이미지
    const files = e.target.files;
    handlePostImgs(files);

    // previews ==> 미리보기 이미지
    const fileList = Array.from(e.target.files as FileList);
    const previews: string[] = fileList.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImgs(previews);
    console.log("previews:", previews);
  };

  useEffect(() => {
    putPrevImg();
  }, [prevImgUrls]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {/* label태그 내에 div를 넣었을 때의 오류 해결을 위함 */}
      <label htmlFor="file">
        <input
          multiple
          className="hidden"
          onChange={handleImageChange}
          disabled={previewImgs.length > 0}
          accept="image/*"
          id="file"
          type="file"
          name="file"
        />
        <div className="carousel h-52 w-52 border border-solid border-gray-300">
          {previewImgs.map((url, i) => (
            <div
              key={url}
              id={`item${i}`}
              className="carousel-item relative w-full overflow-hidden"
            >
              <img src={url} className="absolute h-52 w-52" alt={`file${i}`} />
              <button
                className="absolute right-2 top-3 h-8 w-8"
                onClick={() => {
                  setPreviewImgs(previewImgs.filter((el) => el !== url));
                }}
              >
                {/* <img
                  src="/svg/deleteIcon.svg"
                  alt="deleteIcon"
                  className="z-20 h-7 w-7 max-w-12"
                /> */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.3088 1.22279C17.3094 1.22297 17.3099 1.22325 17.3109 1.22429L18.7757 2.68907C18.7768 2.69012 18.7771 2.6906 18.7772 2.69121C18.7774 2.69178 18.7774 2.69239 18.7772 2.69296C18.7771 2.69354 18.7768 2.69403 18.7757 2.69507L11.4708 10L18.7757 17.305C18.7768 17.306 18.7771 17.3065 18.7772 17.3071C18.7774 17.3077 18.7774 17.3083 18.7772 17.3089C18.7771 17.3094 18.7768 17.3099 18.7757 17.311L17.3109 18.7758C17.3099 18.7768 17.3094 18.7771 17.3088 18.7773C17.3082 18.7774 17.3076 18.7774 17.3071 18.7773C17.3065 18.7771 17.306 18.7768 17.305 18.7758L10 11.4708L2.69504 18.7758C2.69402 18.7768 2.69351 18.7771 2.69293 18.7773C2.69235 18.7774 2.69173 18.7774 2.69115 18.7773C2.69059 18.7771 2.69008 18.7768 2.68904 18.7758L1.22426 17.311C1.22322 17.3099 1.22294 17.3095 1.22276 17.3088C1.22259 17.3083 1.22259 17.3077 1.22276 17.3071C1.22294 17.3065 1.22322 17.306 1.22426 17.305L8.52919 10L1.22426 2.69507C1.22322 2.69405 1.22294 2.69354 1.22276 2.69296C1.22258 2.69238 1.22258 2.69176 1.22276 2.69118C1.22294 2.69062 1.22322 2.69012 1.22426 2.68907L2.68904 1.22429C2.69008 1.22325 2.69057 1.22297 2.69118 1.22279C2.69175 1.22262 2.69236 1.22262 2.69293 1.22279C2.69351 1.22297 2.69399 1.22325 2.69504 1.22429L10 8.52922L17.305 1.22429C17.306 1.22325 17.3065 1.22297 17.3071 1.22279C17.3076 1.22261 17.3083 1.22261 17.3088 1.22279H17.3088Z"
                    fill="black"
                    stroke="white"
                  />
                </svg>
              </button>
            </div>
          ))}
          <div
            className={`${previewImgs.length > 0 ? "hidden" : ""} carousel-item flex h-full w-full flex-col items-center justify-center gap-1 bg-subLightGray text-base text-subGray`}
          >
            사진 추가
            <div className="text-xs">1MB 미만의 파일만 업로드 가능합니다</div>
            <div className="text-xs">(최대 5장까지 첨부 가능)</div>
          </div>
        </div>
        <div className="flex w-full justify-center gap-3 pb-2 pt-2">
          {previewImgs.map((url, i) => (
            <a
              href={`#item${i}`}
              className="btn btn-xs w-6 rounded-xl"
              key={url}
            >
              {i + 1}
            </a>
          ))}
        </div>
      </label>
    </div>
  );
};

export default ImageInput;
