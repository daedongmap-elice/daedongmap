import Select from "@/components/review/ReviewGallery/Select";
import Logo from "../../components/review/ReviewGallery/Logo";
import Thumbnail from "../../components/review/ReviewGallery/Thumbnail";

export default function ReviewGallery() {
  return (
    <>
      <div className="flex justify-between mb-2">
        <Logo />
        <div>
          <Select items={["추천순", "인기순", "최신순"]} />
          <Select
            items={[
              "전국",
              "서울",
              "경기도",
              "강원도",
              "충청도",
              "경상도",
              "전라도",
              "제주도",
            ]}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px">
        <Thumbnail imageUrl="img/sample1.png" />
        <Thumbnail imageUrl="img/sample2.png" />
        <Thumbnail imageUrl="img/sample3.png" />
        <Thumbnail imageUrl="img/sample4.png" />
        <Thumbnail imageUrl="img/sample1.png" />
        <Thumbnail imageUrl="img/sample2.png" />
        <Thumbnail imageUrl="img/sample3.png" />
        <Thumbnail imageUrl="img/sample4.png" />
        <Thumbnail imageUrl="img/sample1.png" />
        <Thumbnail imageUrl="img/sample2.png" />
        <Thumbnail imageUrl="img/sample3.png" />
        <Thumbnail imageUrl="img/sample4.png" />
        <Thumbnail imageUrl="img/sample1.png" />
        <Thumbnail imageUrl="img/sample2.png" />
        <Thumbnail imageUrl="img/sample3.png" />
        <Thumbnail imageUrl="img/sample4.png" />
        <Thumbnail imageUrl="img/sample1.png" />
        <Thumbnail imageUrl="img/sample2.png" />
        <Thumbnail imageUrl="img/sample3.png" />
        <Thumbnail imageUrl="img/sample4.png" />
      </div>
    </>
  );
}
