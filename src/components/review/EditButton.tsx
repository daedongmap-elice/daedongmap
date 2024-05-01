import { AiOutlineMore } from "react-icons/ai";

export default function EditButton() {
  // TODO: 수정 버튼 클릭 시 현재 리뷰아이디를 ReviewEdit에 전달하기
  // TODO: 삭제 버튼 클릭 시 현재 리뷰아이디로 delete요청 보내기
  //      '리뷰를 삭제하시겠습니까?' 모달 띄우고 확인/취소 버튼
  return (
    <>
      <div className="dropdown dropdown-end mr-1">
        <div tabIndex={0} role="button">
          <AiOutlineMore className="h-6 w-6" />
        </div>
        <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
          <li>
            <a href="/edit">수정</a>
          </li>
          <li>
            <a href="/">삭제</a>
          </li>
        </ul>
      </div>
    </>
  );
}
