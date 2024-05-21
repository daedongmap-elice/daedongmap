interface AlertProps {
  title: string;
  subTitle?: string;
  buttonText?: string;
  onClick: () => void;
  onClose?: () => void;
}

export default function Alert({
  title,
  subTitle,
  buttonText,
  onClick,
  onClose,
}: AlertProps) {
  return (
    <div className="fixed left-1/2 top-1/3 z-50 w-fit min-w-48 -translate-x-1/2 -translate-y-1/2">
      <div
        role="alert"
        className="alert border border-solid border-zinc-200 bg-white shadow-md"
      >
        <div className="w-max max-w-72 px-1 py-2">
          <h3 className="pb-3 text-lg font-bold">{title}</h3>
          {subTitle && <div className="text-xs">{subTitle}</div>}
        </div>
        <div className="flex w-full justify-evenly pb-3">
          {onClose && (
            <button className="btn btn-sm" onClick={onClose}>
              취소
            </button>
          )}
          <button
            className="btn btn-sm border-mainY bg-mainY"
            onClick={onClick}
          >
            {buttonText || "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}
