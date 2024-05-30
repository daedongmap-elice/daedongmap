import { LatLngData, PlaceData, PlaceInfoData } from "@/type/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PlaceInfoCardProps {
  place: PlaceData | PlaceInfoData;
  userLocation?: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  };
  type: "main" | "post";
  handleSetPlace?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function PlaceInfoCard({
  place,
  userLocation,
  type,
  handleSetPlace,
}: PlaceInfoCardProps) {
  if (!place) {
    return null;
  }
  const nav = useNavigate();
  const [distance, setDistance] = useState(0);
  const [placeInfo, setPlaceInfo] = useState<PlaceData>({
    kakaoPlaceId: 0,
    placeName: "",
    addressName: "",
    categoryName: "",
    roadAddressName: "",
    placeUrl: "",
    phone: null,
    x: 0,
    y: 0,
    averageRating: 0,
    id: 0,
    reviewCnt: "",
    reviewImagePath: "",
  });
  const isMain = type === "main";

  const handleClickKaKaoBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.open(placeInfo.placeUrl);
    e.stopPropagation();
  };

  const handleClickCard = () => {
    nav(`/feed/${placeInfo.kakaoPlaceId}`);
  };

  useEffect(() => {
    setPlaceInfo((prev) => ({
      ...prev,
      ...place,
    }));

    if (userLocation?.errMsg === null) {
      const pos = new kakao.maps.Polyline({
        path: [
          new kakao.maps.LatLng(
            userLocation.center.lat,
            userLocation.center.lng
          ),
          new kakao.maps.LatLng(Number(place.y), Number(place.x)),
        ],
      });
      const dist = Math.round(pos.getLength());
      setDistance(dist);
    }
  }, []);

  return (
    <div onClick={handleClickCard} aria-hidden>
      <div className="h-fit w-full rounded-lg bg-white p-2.5 shadow">
        <div className="flex justify-between">
          <div className="flex max-w-[220px] flex-col gap-0.5">
            <div>
              <h2 className="truncate font-normal text-subGray">
                <span className="text-base font-bold text-black">
                  {placeInfo.placeName}
                </span>
                <p className="inline text-xs">&nbsp;{placeInfo.categoryName}</p>
              </h2>
            </div>
            {isMain && (
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-medium">
                  {placeInfo.averageRating}
                </h4>
                <div className="rating rating-half rating-xs pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className={`mask ${i % 2 === 0 ? "mask-half-1" : "mask-half-2"} mask-star-2 bg-mainY`}
                      defaultChecked={
                        i === Math.floor(placeInfo.averageRating * 2) - 1
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-subGray">({placeInfo.reviewCnt})</p>
              </div>
            )}

            <p className="truncate text-xs">{placeInfo.roadAddressName}</p>
            <div className="flex gap-1">
              {isMain && userLocation?.errMsg === null && (
                <p className="text-xs font-medium">{`${(distance / 1000).toFixed(1)}km`}</p>
              )}
              {isMain && userLocation?.errMsg === null && placeInfo.phone && (
                <p className="text-xs font-bold">|</p>
              )}
              {placeInfo.phone && (
                <p className="text-xs text-mainG">{placeInfo.phone}</p>
              )}
            </div>
          </div>

          {isMain && (
            <img
              src={placeInfo.reviewImagePath}
              alt="음식점 사진"
              className="h-[80px] w-[80px] rounded object-cover"
            />
          )}
        </div>
        <div className="flex gap-3">
          <button
            className="mt-1.5 inline-flex h-6 w-full items-center justify-center rounded-full border border-solid border-slate-300 bg-white text-xs"
            onClick={(e) => handleClickKaKaoBtn(e)}
          >
            kakao<strong>map</strong>으로 보기
          </button>
          {!isMain && handleSetPlace && (
            <button
              className="mt-1.5 inline-flex h-6 w-full items-center justify-center rounded-full border border-solid border-mainY bg-mainY text-xs font-semibold text-YbtnText"
              onClick={(e) => handleSetPlace(e)}
            >
              선택하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
