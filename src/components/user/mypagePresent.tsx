export default function MyPagePresent() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-[80px] flex flex-row">
          <div className="avatar mr-4">
            <div className="w-24 rounded-full border-solid border  border-subGray">
              <img src="img/profile.jpg" alt="프로필 이미지 " />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-semibold">맛정호</span>
            <div>
              <span className="text-xs text-subGray">게시글</span>
              <span className="text-xs">10</span>
            </div>
            <span className="text-sm">전국의 맛집을 소개하리다!</span>
          </div>
        </div>
        <button className="btn btn-sm mt-[30px] w-[280px] bg-mainG text-GbtnText">
          <a href="/editprofile">프로필 편집</a>
        </button>
        <hr className="mt-5 w-10/12 border-t border-solid border-subLightGray" />
      </div>
    </>
  );
}
