import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
  map: kakao.maps.Map | undefined;
  type: "main" | "post";
  setShowInfoCard?: React.Dispatch<React.SetStateAction<boolean>>;
  getPlaces: () => Promise<void>;
}

export default function SearchInput({
  map,
  type,
  setShowInfoCard,
  getPlaces,
}: SearchInputProps) {
  const [text, setText] = useState<string>("");

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSearch = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (text !== "") {
      try {
        ps.keywordSearch(`${text} 지역`, async (datas, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = map.getBounds();
            bounds.extend(
              new kakao.maps.LatLng(Number(datas[0].y), Number(datas[0].x))
            );
            map.setBounds(bounds);
            map.setLevel(7);
            await getPlaces();
          }
        });
      } catch (err) {
        console.log(err);
      }

      if (setShowInfoCard) {
        setShowInfoCard(false);
      }
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [map]);

  return (
    <div className="absolute left-1/2 top-12 z-30 -translate-x-1/2">
      <div className="relative h-11 w-[320px]">
        <input
          type="text"
          className="absolute h-full w-full rounded-md p-2.5 text-sm shadow"
          placeholder={type === "main" ? "지역 검색" : "음식점 검색"}
          onChange={(e) => handleOnClick(e)}
          onKeyDown={(e) => handleOnKeyDown(e)}
        ></input>
        <IoSearch
          onClick={handleSearch}
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
