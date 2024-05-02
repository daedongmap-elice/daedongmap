import { useState } from "react";

export default function ReviewImage() {
  // TODO: 해당 게시글의 이미지를 조회해서 불러온 다음 map으로 그려내야 함
  //       base64형식의 string배열을 FileReader API를 통해 File 형식으로 변환해야 함
  // TODO: 버튼으로 한장씩 넘기도록, 페이지 나타내는 것 번호를 작은 원으로 고치고 버튼없애기
  const [slideIndex, setSlideIndex] = useState(1);

  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="img/sample3.png" className="w-full" alt="item" />
          <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-50">
            <a
              href="/"
              className="btn btn-circle invisible"
              onClick={() => setSlideIndex(1)}
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle"
              onClick={() => setSlideIndex(2)}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="img/sample4.png" className="w-full" alt="item" />
          <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-50">
            <a
              href="#slide1"
              className="btn btn-circle"
              onClick={() => setSlideIndex(1)}
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle"
              onClick={() => setSlideIndex(3)}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="img/sample1.png" className="w-full" alt="item" />
          <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-50">
            <a
              href="#slide2"
              className="btn btn-circle"
              onClick={() => setSlideIndex(2)}
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="btn btn-circle"
              onClick={() => setSlideIndex(4)}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="img/sample2.png" className="w-full" alt="item" />
          <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-50">
            <a
              href="#slide3"
              className="btn btn-circle"
              onClick={() => setSlideIndex(3)}
            >
              ❮
            </a>
            <a
              href="#slide5"
              className="btn btn-circle"
              onClick={() => setSlideIndex(5)}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide5" className="carousel-item relative w-full">
          <img src="img/sample4.png" className="w-full" alt="item" />
          <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between opacity-50">
            <a
              href="#slide4"
              className="btn btn-circle"
              onClick={() => setSlideIndex(4)}
            >
              ❮
            </a>
            <a
              href="/"
              className="btn btn-circle invisible"
              onClick={() => setSlideIndex(5)}
            >
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-1 pt-3">
        <div
          className={`rounded ${slideIndex === 1 ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
        ></div>
        <div
          className={`rounded ${slideIndex === 2 ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
        ></div>
        <div
          className={`rounded ${slideIndex === 3 ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
        ></div>
        <div
          className={`rounded ${slideIndex === 4 ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
        ></div>
        <div
          className={`rounded ${slideIndex === 5 ? "h-1.5 w-1.5 bg-mainG" : "h-1 w-1 rounded bg-subLightGray"}`}
        ></div>
      </div>
    </>
  );
}
