import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImageInput() {
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgsArray = Array.from(e.target.files as FileList);
    const selectedImgs: string[] = imgsArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setImages(selectedImgs);
    navigate("/post/#item0");
  };

  // TODO: 삭제 버튼, 삭제 기능 만들기
  // const deleteImage = () => {};

  // useEffect(() => {
  //   if (images.length === 0 && guide) {
  //     guide.className = originalClass;
  //   }
  // }, [images]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {/* label태그 내에 div를 넣었을 때의 오류 해결을 위함 */}
      <label htmlFor="file">
        <input
          required
          multiple
          className="hidden"
          onChange={handleImageChange}
          disabled={images.length === 5}
          accept=".jpg, .jpeg, .png, .svg"
          id="file"
          type="file"
          name="file"
        />
        <div className="carousel h-52 min-h-52 w-52">
          {images.map((url, i) => (
            <div key={url} id={`item${i}`} className="carousel-item w-full">
              <img src={url} className="w-full" alt={`file${i}`} />
              <div className="relative left-3/4 top-9 ml-4 h-5 w-5 bg-[url('svg/deleteIcon.svg')]"></div>
            </div>
          ))}
          <div
            className={`${images.length > 0 ? "hidden" : ""} carousel-item flex h-full w-full flex-col items-center justify-center bg-subLightGray text-base text-subGray`}
          >
            사진 추가
            <div className="text-sm">(최대 5장까지 첨부 가능)</div>
          </div>
        </div>
        <div className="flex w-full justify-center gap-3 pb-2 pt-2">
          {images.map((url, i) => (
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
}
