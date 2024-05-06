import ReviewDetail from "./ReviewDetail";

// TODO: '음식점별 리뷰 조회' (/api/reviews/places/kakaoPlaceId??)로 데이터 받아와서 리뷰 상세에 뿌리기

export default function ReviewFeed() {
  return (
    <>
      <ReviewDetail />
      <div className="divider"></div>
      <ReviewDetail />
      <div className="divider"></div>
      <ReviewDetail />
      <div className="divider"></div>
    </>
  );
}
