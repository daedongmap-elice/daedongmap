import { useEffect, useState } from "react";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
  type: "main" | "post";
}

export default function SearchInput2({ type }: SearchInputProps) {
  const [text, setText] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleResetText = () => {
    setText("");
  };

  const handlerOnClickSearch = () => {
    setSearchParams({ q: text });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      handlerOnClickSearch();
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  useEffect(() => {
    if (query !== null) {
      setText(query);
    }
  }, []);

  return (
    <>
      <div className="absolute left-1/2 top-12 z-30 -translate-x-1/2">
        <div className="relative h-11 w-[320px]">
          <input
            type="text"
            value={text}
            className="absolute h-full w-full rounded-md p-2.5 text-sm shadow"
            placeholder={type === "main" ? "지역 검색" : "음식점 검색"}
            onChange={(e) => handleOnClick(e)}
            onKeyDown={(e) => handleOnKeyDown(e)}
          ></input>
          {text !== "" && (
            <IoCloseCircle
              onClick={handleResetText}
              className="absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 text-subLightGray"
            />
          )}
          <IoSearch
            onClick={handlerOnClickSearch}
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
          />
        </div>
      </div>
    </>
  );
}
