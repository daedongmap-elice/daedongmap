import { useEffect, useState } from "react";

interface ThumbnailProps {
  reviewIds: number[];
  imgUrls: string[];
}

const Thumbnail = ({ reviewIds, imgUrls }: ThumbnailProps) => {
  const [idAndUrl, setIdAndUrl] = useState<{ id: number; url: string }[]>([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // map 사용을 위해 reviewIds배열과 imgUrls배열을 하나로 합치기
    const combination = reviewIds.map((id, i) => ({ id: id, url: imgUrls[i] }));
    setIdAndUrl(combination);
  }, [reviewIds]);

  return (
    <>
      {idAndUrl.map((el, i) => (
        <a
          href={`/detail#${el.id}`}
          key={`thumbnail${i}`}
          onClick={() => {
            if (!token) {
              alert("로그인이 필요합니다.");
            }
          }}
        >
          <img
            src={el.url}
            alt="thumbnail"
            className="h-full w-full object-cover"
          />
        </a>
      ))}
    </>
  );
};

export default Thumbnail;
