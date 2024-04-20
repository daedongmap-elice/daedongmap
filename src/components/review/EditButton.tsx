import { AiOutlineMore } from "react-icons/ai";

export default function EditButton() {
  return (
    <>
      <div className="dropdown dropdown-end mr-1">
        <div tabIndex={0} role="button">
          <AiOutlineMore className="h-6 w-6" />
        </div>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
          <li>
            <a href="/">수정</a>
          </li>
          <li>
            <a href="/">삭제</a>
          </li>
        </ul>
      </div>
    </>
  );
}
