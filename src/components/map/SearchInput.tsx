import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
  setMarkers: React.Dispatch<
    React.SetStateAction<
      | {
          address_name: string;
          category_name: string;
          id: string;
          phone: string;
          place_name: string;
          place_url: string;
          road_address_name: string;
          x: string;
          y: string;
        }[]
      | undefined
    >
  >;
  map: kakao.maps.Map | undefined;
  type: "main" | "post";
  setShowInfoCard?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchInput({
  setMarkers,
  map,
  type,
  setShowInfoCard,
}: SearchInputProps) {
  const [text, setText] = useState<string>("");

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSearch = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (text !== "") {
      ps.keywordSearch(`${text} 음식점`, (datas, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const places: {
            address_name: string;
            category_name: string;
            id: string;
            phone: string;
            place_name: string;
            place_url: string;
            road_address_name: string;
            x: string;
            y: string;
          }[] = [];

          datas.map((data) => {
            places.push({
              address_name: data.address_name,
              category_name: data.category_name,
              id: data.id,
              phone: data.phone,
              place_name: data.place_name,
              place_url: data.place_url,
              road_address_name: data.road_address_name,
              x: data.x,
              y: data.y,
            });
            bounds.extend(
              new kakao.maps.LatLng(Number(data.y), Number(data.x))
            );
          });

          setMarkers(places);
          map.setBounds(bounds);
        }
      });

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
    <div className="absolute left-1/2 top-10 z-10 h-11 w-[320px] -translate-x-1/2">
      <div className="relative h-full w-full">
        <input
          type="text"
          className="absolute h-full w-full rounded-md p-2.5 text-sm shadow"
          placeholder={type === "main" ? "지역/맛집 검색" : "음식점 검색"}
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
