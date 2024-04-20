import DateCreated from "../DateCreated";

export default function Comment() {
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
          <div className="text-xs max-w-64">
            <p className="mb-2 flex justify-between items-center">
              <b>유저닉네임</b>
              <DateCreated />
            </p>
            <p className="">
              나중에 가봐야겠네요 헌법개정안은 국회가 의결한 후 30일 이내에
              국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의
              찬성을 얻어야 한다.{" "}
            </p>
          </div>
        </div>
      </a>
    </>
  );
}
