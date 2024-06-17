import { ModalProps } from "@/type/types";

const FollowModal = ({ isClickModal }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="z-15 modal-box rounded-lg bg-white shadow-md">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={isClickModal}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FollowModal;
