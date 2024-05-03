import { useEffect, useState } from "react";

interface ThumbnailProps {
  reviewIds: number[];
  imgUrls: string[];
}

const Thumbnail: React.FC<ThumbnailProps> = ({ reviewIds, imgUrls }) => {
  const [idAndUrl, setIdAndUrl] = useState<{ id: number; url: string }[]>([]);
  useEffect(() => {
    // map 사용을 위해 reviewIds배열과 imgUrls배열을 하나로 합치기
    const combination = reviewIds.map((id, i) => ({ id: id, url: imgUrls[i] }));
    setIdAndUrl(combination);
  }, [reviewIds]);

  return (
    <>
      {idAndUrl.map((el, i) => (
        <a href={`/detail#${el.id}`} key={`thumbnail${i}`}>
          <img src={el.url} alt="thumbnail" className="w-full" />
        </a>
      ))}
    </>
  );
};

export default Thumbnail;
