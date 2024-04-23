export default function ReviewProfile() {
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
