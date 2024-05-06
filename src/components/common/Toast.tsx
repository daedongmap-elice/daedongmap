import { useEffect } from "react";

interface ToastProps {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Toast({ setToast }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="absolute bottom-28 left-1/2 z-50 h-fit w-[300px] -translate-x-1/2">
      <div className="rounded-full bg-subGray px-3 py-1 text-center text-sm text-white">
        이 지역에는 리뷰가 등록된 맛집이 없습니다.
      </div>
    </div>
  );
}
