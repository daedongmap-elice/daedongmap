// import { useState } from "react";

export default function ImageInput() {
  // const [images, setImages] = useState([]);
  // const [isAttached, setIsAttached] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);

  // const handleImageChange = (e) => {
  // setImages((prevFiles) => {
  //   const newImages = [...prevFiles];
  //   newImages[Number(e.target.id)] = e.target.files[0].name;
  //   return newImages;
  // });
  // setIsAttached((prev) => {
  //   const newArr = [...prev];
  //   newArr[Number(e.target.id)] = true;
  //   return newArr;
  // });
  // };

  return (
    <>
      {/* {isAttached ? (
        <>
          <div className="carousel w-full">
            <div id="item1" className="carousel-item w-full">
              <img src="img/sample3.png" className="w-full" alt="item" />
            </div>
            <div id="item2" className="carousel-item w-full">
              <img src="img/sample4.png" className="w-full" alt="item" />
            </div>
            <div id="item3" className="carousel-item w-full">
              <img src="img/sample1.png" className="w-full" alt="item" />
            </div>
            <div id="item4" className="carousel-item w-full">
              <img src="img/sample2.png" className="w-full" alt="item" />
            </div>
            <div id="item5" className="carousel-item w-full">
              <img src="img/sample3.png" className="w-full" alt="item" />
            </div>
          </div>
          <div className="flex w-full justify-center gap-2 pb-2 pt-2">
            <a href="#item1" className="btn btn-xs w-6 rounded-xl">
              1
            </a>
            <a href="#item2" className="btn btn-xs w-6 rounded-xl">
              2
            </a>
            <a href="#item3" className="btn btn-xs w-6 rounded-xl">
              3
            </a>
            <a href="#item4" className="btn btn-xs w-6 rounded-xl">
              4
            </a>
            <a href="#item5" className="btn btn-xs w-6 rounded-xl">
              5
            </a>
          </div>
        </>
      ) : (
        <label htmlFor="file">
          <div className="flex h-52 min-h-52 w-52 flex-col items-center justify-center  bg-subLightGray text-lg text-subGray">
            사진 추가
            <div className="text-base">(최대 5장까지 첨부 가능)</div>
          </div>
          <input
            className="hidden"
            type="file"
            name="file"
            id="file"
            accept={"image/png, image/jpeg, image/jpg"}
          />
        </label>
      )} */}
    </>
  );
}
