import DateCreated from "../DateCreated";

// 닉네임, 댓글내용, 작성일을 prop로 내려받기

const Comment = () => {
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
          <div className="max-w-64 text-xs">
            <p className="mb-2 flex items-center justify-between">
              <b>유저닉네임</b>
              <DateCreated createdAt={""} />
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
};

export default Comment;
