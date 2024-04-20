export default function UserProfile() {
  return (
    <>
      <a href="/">
        <div className="mt-4 mb-3 flex">
          <div>
            <img
              className="mask mask-circle w-9 ml-3 mr-3"
              src="img/sample3.png"
              alt="user-profile"
            />
          </div>
          <div>
            <p className="text-xs mb-0.5">
              <b>유저닉네임</b>
            </p>
            <p className="text-xxs">식당 이름</p>
          </div>
        </div>
      </a>
    </>
  );
}
