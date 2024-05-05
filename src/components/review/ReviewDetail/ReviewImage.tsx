import { useState } from "react";

interface ReviewImageProps {
  imgUrls: string[];
}

const ReviewImage: React.FC<ReviewImageProps> = ({ imgUrls }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const isImgOnlyOne = imgUrls.length === 1;

  return (
    <>
      <div className="carousel w-full">
        {imgUrls.map((url, i) => (
          <div
            id={`slide${i}`}
            key={url}
            className="carousel-item relative w-full"
          >
            {isImgOnlyOne ? (
              <img src={url} className="w-full" alt="item" />
            ) : (
              <>
                <img src={url} className="w-full" alt="item" />
                <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-50">
                  <a
                    href={i === 0 ? "/" : `#slide${i - 1}`}
                    className={`btn btn-circle ${i === 0 ? "invisible" : ""}`}
                    onClick={() =>
                      i === 0 ? setSlideIndex(0) : setSlideIndex(i - 1)
                    }
                  >
                    ❮
                  </a>
                  <a
                    href={i === imgUrls.length - 1 ? "/" : `#slide${i + 1}`}
                    className={`btn btn-circle ${i === imgUrls.length - 1 ? "invisible" : ""}`}
                    onClick={() =>
                      i === imgUrls.length - 1
                        ? setSlideIndex(imgUrls.length - 1)
                        : setSlideIndex(i + 1)
                    }
                  >
                    ❯
                  </a>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-1 pt-3">
        {imgUrls.map(
          (url, i) =>
            !isImgOnlyOne && (
              <div
                key={url}
                className={`rounded ${slideIndex === i ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
              ></div>
            )
        )}
      </div>
    </>
  );
};

export default ReviewImage;
