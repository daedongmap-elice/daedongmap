import { useEffect } from "react";

interface ToastProps {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export default function Toast({ setToast, message }: ToastProps) {
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
        {message}
      </div>
    </div>
  );
}
