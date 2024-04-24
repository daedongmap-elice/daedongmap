export default function ReviewImage() {
  return (
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
      <div className="flex w-full justify-center gap-3 pb-2 pt-2">
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
  );
}
