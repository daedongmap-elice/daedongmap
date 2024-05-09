import { LatLngData, PlaceData } from "@/type/types";
import { useEffect, useState } from "react";

interface PlaceInfoCardProps {
  place: PlaceData;
  userLocation?: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  };
  type: "main" | "post";
  handleSetPlace?: () => void;
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
  const [distance, setDistance] = useState(0);
  const {
    averageRating,
    categoryName,
    phone,
    placeName,
    placeUrl,
    roadAddressName,
    reviewCnt,
    reviewImagePath,
  } = place;

  const handleClickKaKaoBtn = () => {
    window.open(placeUrl);
  };

  useEffect(() => {
    if (userLocation) {
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
    <div className="h-fit w-full rounded-lg bg-white p-2.5 shadow">
      <div className="flex justify-between">
        <div className="flex max-w-[220px] flex-col gap-0.5">
          <div>
            <h2 className="truncate font-normal text-subGray">
              <span className="text-base font-bold text-black">
                {placeName}
              </span>
              <p className="inline text-xs">&nbsp;{categoryName}</p>
            </h2>
          </div>
          {type === "main" && (
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-medium">{averageRating}</h4>
              <div className="rating rating-half rating-xs pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    className={`mask mask-half-${i % 2 === 0 ? 1 : 2} mask-star-2 bg-mainY`}
                    defaultChecked={i === Math.floor(averageRating * 2) - 1}
                  />
                ))}
              </div>
              <p className="text-xs text-subGray">({reviewCnt})</p>
            </div>
          )}

          <p className="truncate text-xs">{roadAddressName}</p>
          <div className="flex gap-1">
            {type === "main" && (
              <p className="text-xs font-medium">{`${(distance / 1000).toFixed(1)}km`}</p>
            )}
            {type === "main" && phone && <p className="text-xs font-bold">|</p>}
            {phone && <p className="text-xs text-mainG">{phone}</p>}
          </div>
        </div>

        {type === "main" && (
          <img
            src={reviewImagePath}
            alt="음식점 사진"
            className="h-[80px] w-[80px] rounded object-cover"
          />
        )}
      </div>
      <div className="flex gap-3">
        <button
          className="mt-1.5 inline-flex h-6 w-full items-center justify-center rounded-full border border-solid border-slate-300 bg-white text-xs"
          onClick={handleClickKaKaoBtn}
        >
          kakao<strong>map</strong>으로 보기
        </button>
        {type === "post" && (
          <button
            className="mt-1.5 inline-flex h-6 w-full items-center justify-center rounded-full border border-solid border-mainY bg-mainY text-xs font-semibold text-YbtnText"
            onClick={handleSetPlace}
          >
            선택하기
          </button>
        )}
      </div>
    </div>
  );
}
