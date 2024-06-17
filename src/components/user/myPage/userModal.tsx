import { ModalProps } from "@/type/types";

const UserModal = ({
  isClickModal,
  handleChange,
  isClickDelete,
  buttonDisabled,
  type,
  follow,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="z-15 modal-box rounded-lg bg-white shadow-md">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={isClickModal}
        >
          X
        </button>
        {type === "delete" && (
          <>
            <h3 className="text-bg-error fort-bold mb-4 text-center text-lg">
              회원탈퇴
            </h3>
            <input
              className="input-m input input-bordered w-full"
              type="text"
              name="message"
              onChange={handleChange}
              placeholder="회원탈퇴를 입력해주세요."
            />
            <div className="flex w-full justify-center">
              <button
                className="btn btn-wide mt-3 bg-mainG text-GbtnText"
                onClick={isClickDelete}
                disabled={buttonDisabled}
              >
                회원탈퇴
              </button>
            </div>
          </>
        )}
        {type === "followers" && <>{follow.followers[0]}</>}
      </div>
    </div>
  );
};

export default UserModal;
