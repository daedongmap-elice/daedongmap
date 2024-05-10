import { useEffect, useState } from "react";
import PerfectScrollar from "react-perfect-scrollbar";

interface ThumbnailProps {
  reviewIds: number[];
  imgUrls: string[];
}

const Thumbnail = ({ reviewIds, imgUrls }: ThumbnailProps) => {
  const [idAndUrl, setIdAndUrl] = useState<{ id: number; url: string }[]>([]);

  useEffect(() => {
    // map 사용을 위해 reviewIds배열과 imgUrls배열을 하나로 합치기
    const combination = reviewIds.map((id, i) => ({ id: id, url: imgUrls[i] }));
    setIdAndUrl(combination);
  }, [reviewIds]);

  return (
    <>
      <PerfectScrollar>
        <div className="grid grid-cols-3 gap-px">
          {idAndUrl.map((el, i) => (
            <a href={`/detail#${el.id}`} key={`thumbnail${i}`}>
              <img
                src={el.url}
                alt="thumbnail"
                className="h-full max-h-32 w-full object-cover"
              />
            </a>
          ))}
        </div>
      </PerfectScrollar>
    </>
  );
};

export default Thumbnail;
