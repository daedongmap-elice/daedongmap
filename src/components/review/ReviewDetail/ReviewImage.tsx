import { useState } from "react";

interface ReviewImageProps {
  fileLinks: string[];
}

const ReviewImage: React.FC<ReviewImageProps> = ({ fileLinks }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  return (
    <>
      <div className="carousel w-full">
        {fileLinks.map((link, i) => (
          <div
            id={`slide${i}`}
            key={`slide${i}`}
            className="carousel-item relative w-full"
          >
            {fileLinks.length === 1 ? (
              <img src={link} className="w-full" alt="item" />
            ) : (
              <>
                <img src={link} className="w-full" alt="item" />
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
                    href={i === fileLinks.length - 1 ? "/" : `#slide${i + 1}`}
                    className={`btn btn-circle ${i === fileLinks.length - 1 ? "invisible" : ""}`}
                    onClick={() =>
                      i === fileLinks.length - 1
                        ? setSlideIndex(fileLinks.length - 1)
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
      <div
        id="slideIndex"
        className="flex w-full items-center justify-center gap-1 pt-3"
      >
        {fileLinks.map((link, i) =>
          fileLinks.length === 1 ? (
            <></>
          ) : (
            <div
              className={`rounded ${slideIndex === i ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
            ></div>
          )
        )}
      </div>
    </>
  );
};

export default ReviewImage;
