export default function ReviewProfile() {
  // TODO: ReviewProfile 클릭하면 '마이페이지'로 넘어가서 '사용자별 리뷰 조회'하도록 해야 함

  return (
    <>
      <a href="/">
        <div className="mb-3 mt-4 flex">
          <div>
            <img
              className="mask mask-circle ml-3 mr-3 w-9"
              src="img/sample3.png"
              alt="user-profile"
            />
          </div>
          <div>
            <p className="mb-0.5 text-xs">
              <b>유저닉네임</b>
            </p>
            <p className="text-xxs">식당 이름</p>
          </div>
        </div>
      </a>
    </>
  );
}
