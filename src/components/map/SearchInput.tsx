import { useEffect, useState } from "react";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import Toast from "../common/Toast";
import { PlaceInfoData } from "@/type/types";

interface SearchInputProps {
  map: kakao.maps.Map | undefined;
  type: "main" | "post";
  handleToggleShowInfoCard: (state: boolean) => void;
  handleResetSelectMarker: () => void;
  getPlaces?: () => Promise<void>;
  handleSetMarkers?: (places: any) => void;
}

export default function SearchInput({
  map,
  type,
  handleToggleShowInfoCard,
  getPlaces,
  handleResetSelectMarker,
  handleSetMarkers,
}: SearchInputProps) {
  const [text, setText] = useState<string>("");
  const [emptyInputToast, setEmptyInputToast] = useState<boolean>(false);
  const [zeroResultToast, setZeroResultToast] = useState<boolean>(false);

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleResetText = () => {
    setText("");
  };

  const handleSearchPlace = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    try {
      ps.keywordSearch(
        type === "main" ? text : text + " 음식점",
        (datas, status) => {
          if (status === kakao.maps.services.Status.ZERO_RESULT) {
            setZeroResultToast(true);
          }
          if (status === kakao.maps.services.Status.OK) {
            if (type === "main") {
              map.setCenter(
                new kakao.maps.LatLng(Number(datas[0].y), Number(datas[0].x))
              );
              map.setLevel(5);
              if (getPlaces) {
                getPlaces();
              }
            }

            if (type === "post") {
              const bounds = new kakao.maps.LatLngBounds();
              const newMarkers: PlaceInfoData[] = [];

              datas.map((data) => {
                const {
                  address_name: addressName,
                  category_name: categoryName,
                  id: kakaoPlaceId,
                  phone,
                  place_name: placeName,
                  place_url: placeUrl,
                  road_address_name: roadAddressName,
                  x,
                  y,
                } = data;
                const category = categoryName.split(">")[1].trim();

                newMarkers.push({
                  addressName,
                  categoryName: category,
                  kakaoPlaceId: Number(kakaoPlaceId),
                  phone,
                  placeName,
                  placeUrl,
                  roadAddressName,
                  x: Number(x),
                  y: Number(y),
                });

                bounds.extend(new kakao.maps.LatLng(Number(y), Number(x)));
              });

              if (handleSetMarkers) {
                handleSetMarkers(newMarkers);
              }

              map.setBounds(bounds);
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
    handleResetSelectMarker();
    handleToggleShowInfoCard(false);
  };

  const handlerOnClickSearch = () => {
    if (text === "") {
      setEmptyInputToast(true);
    } else {
      handleSearchPlace();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlerOnClickSearch();
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  useEffect(() => {
    if (text !== "") {
      handleSearchPlace();
    }
  }, [map]);

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
      {zeroResultToast && (
        <Toast
          setToast={setZeroResultToast}
          message={`"${text}"(으)로 검색한 결과가 없습니다.`}
        />
      )}
      {emptyInputToast && (
        <Toast
          setToast={setEmptyInputToast}
          message={"검색어를 입력해주세요."}
        />
      )}
    </>
  );
}
