import { IoSearch } from "react-icons/io5";

export function SearchInput() {
  return (
    <div className="absolute w-10/12 h-11 z-10 top-10 left-1/2 -translate-x-1/2">
      <div className="relative h-full w-full">
        <input
          type="text"
          className="h-full w-full p-2.5 rounded-md absolute shadow text-sm"
          placeholder="지역/맛집 검색"
        ></input>
        <IoSearch className="absolute w-5 h-5 top-1/2 right-3 -translate-y-1/2" />
      </div>
    </div>
  );
}
