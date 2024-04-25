import { IoSearch } from "react-icons/io5";

export default function SearchInput() {
  return (
    <div className="absolute left-1/2 top-10 z-10 h-11 w-10/12 -translate-x-1/2">
      <div className="relative h-full w-full">
        <input
          type="text"
          className="absolute h-full w-full rounded-md p-2.5 text-sm shadow"
          placeholder="지역/맛집 검색"
        ></input>
        <IoSearch className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2" />
      </div>
    </div>
  );
}
