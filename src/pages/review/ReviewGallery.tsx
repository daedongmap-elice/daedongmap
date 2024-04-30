import { Select, Logo, Thumbnail } from "@/components/review/index";

export default function ReviewGallery() {
  // 리뷰 전체 조회하여 썸네일 뿌리기
  return (
    <div className="pb-16">
      <div className="mb-2 flex justify-between">
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
    </div>
  );
}
