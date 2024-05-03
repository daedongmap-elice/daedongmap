import { RefObject } from "react";

interface EditProfileProps {
  handleEditProfile: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  upload: RefObject<HTMLInputElement>;
  imgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgFile: string[];
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
const EditProfilePresnet: React.FC<EditProfileProps> = ({
  handleEditProfile,
  handleChange,
  upload,
  imgUpload,
  imgFile,
  handleButtonClick,
}) => {
  return (
    <>
      <div className="mt-[40px] flex w-full flex-col items-center">
        <img src="img/Logo.jpg" alt="로고 이미지" />
        <input
          className="invisible hidden"
          ref={upload}
          type="file"
          accept="image/*"
          multiple
          onChange={imgUpload}
        />
        <p className="absolute top-[130px] text-subLightGray">프로필 편집</p>
        <div className="avatar">
          <div className="w-24 rounded-full border border-solid  border-subGray">
            <img src={imgFile[0]} alt="프로필 이미지 " />
          </div>
        </div>
        <button
          className="btn btn-link no-underline"
          onClick={handleButtonClick}
        >
          사진 변경
        </button>
        <form onSubmit={handleEditProfile} className="w-full max-w-xs">
          <div className="label">
            <span className="label-text">닉네임</span>
          </div>
          <input
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">자기소개</span>
          </div>
          <textarea
            name="status"
            placeholder="소개글을 입력해주세요.(50자 제한)"
            onChange={handleChange}
            maxLength={50}
            className="textarea textarea-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">웹 사이트</span>
          </div>
          <input
            name="webSite"
            type="text"
            placeholder="연동할 주소를 입력해주세요."
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="flex w-full items-center">
            <button
              type="submit"
              className="btn mx-auto my-6 h-[30px] w-[280px] bg-mainG text-GbtnText"
            >
              프로필 편집
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfilePresnet;
