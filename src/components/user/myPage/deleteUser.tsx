interface ModalProps {
  isClickModal?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isClickDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonDisabled?: boolean;
}
const DeleteUserModal = ({
  isClickModal,
  handleChange,
  isClickDelete,
  buttonDisabled,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="modal-box z-10 rounded-lg bg-white shadow-md">
        <form>
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={isClickModal}
          >
            X
          </button>
        </form>
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
      </div>
    </div>
  );
};

export default DeleteUserModal;
