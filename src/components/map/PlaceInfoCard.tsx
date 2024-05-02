import { useEffect, useState } from "react";

interface PlaceInfoCardProps {
  place: {
    addressName: string;
    averageRating: number;
    categoryName: string;
    id: number;
    kakaoPlaceId: number;
    phone: string | null;
    placeName: string;
    placeUrl: string;
    roadAddressName: string;
    x: number;
    y: number;
  };
  userLocation: {
    center: {
      lat: number;
      lng: number;
    };
    errMsg: null | string;
    isLoading: boolean;
  };
  type: "main" | "post";
}

export default function PlaceInfoCard({
  place,
  userLocation,
  type,
}: PlaceInfoCardProps) {
  if (!place || !userLocation) {
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
  } = place;

  const handleClickKaKaoBtn = () => {
    window.open(placeUrl);
  };

  useEffect(() => {
    const pos = new kakao.maps.Polyline({
      path: [
        new kakao.maps.LatLng(userLocation.center.lat, userLocation.center.lng),
        new kakao.maps.LatLng(Number(place.y), Number(place.x)),
      ],
    });
    const dist = Math.round(pos.getLength());
    setDistance(dist);
  }, []);

  return (
    <div className="h-fit w-full rounded-lg bg-white p-2.5 shadow">
      <div className="flex justify-between">
        <div className="flex flex-col gap-0.5">
          <div>
            <h2 className="text-base font-bold">
              {placeName}
              <p className="inline text-xs font-normal text-subGray">
                &nbsp;{categoryName}
              </p>
            </h2>
          </div>
          {type === "main" && (
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-medium">{averageRating}</h4>
              <div className="rating rating-half rating-xs pointer-events-none">
                <input
                  type="radio"
                  className="mask mask-half-1 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-2 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-1 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-2 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-1 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-2 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-1 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-2 mask-star-2 bg-mainY"
                />
                <input
                  type="radio"
                  className="mask mask-half-1 mask-star-2 bg-mainY"
                  defaultChecked={true}
                />
                <input
                  type="radio"
                  className="mask mask-half-2 mask-star-2 bg-mainY"
                />
              </div>
              <p className="text-xs text-subGray">(265)</p>
            </div>
          )}

          <p className="text-xs">{roadAddressName}</p>
          <div className="flex gap-1">
            {type === "main" && (
              <p className="text-xs font-medium">{`${(distance / 1000).toFixed(1)}km`}</p>
            )}
            {type === "main" && phone && <p className="text-xs font-bold">|</p>}
            {phone && <p className="text-xs text-mainG">{phone}</p>}
          </div>
        </div>

        {type === "main" && (
          <div className="h-[80px] w-[80px] flex-none rounded bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fb9db7f48894e9e0b2c6d22ba7330d0f6a1aa84b5%3Foriginal')] bg-cover bg-center"></div>
        )}
      </div>
      <button
        className="mt-1.5 inline-flex h-5 w-full items-center justify-center rounded-full border border-solid border-slate-300 bg-white text-xs"
        onClick={handleClickKaKaoBtn}
      >
        kakao<strong>map</strong>으로 보기
      </button>
    </div>
  );
}
