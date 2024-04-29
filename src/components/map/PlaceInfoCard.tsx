import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

interface PlaceInfoCardProps {
  place: {
    place_name: string;
    place_url: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    id: string;
    phone: string;
    x: string;
    y: string;
  };
  userLocation: {
    center: {
      lat: number;
      lng: number;
    };
    errMsg: null | string;
    isLoading: boolean;
  };
}

export default function PlaceInfoCard({
  place,
  userLocation,
}: PlaceInfoCardProps) {
  if (!place || !userLocation) {
    return null;
  }
  const [distance, setDistance] = useState(0);
  const {
    place_name: placeName,
    place_url: placeUrl,
    // category_name: categoryName,
    road_address_name: roadAddressName,
    phone,
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
    <div className="flex h-fit w-full flex-col gap-0.5 rounded-lg bg-white p-2.5 shadow">
      <div className="flex items-center gap-1.5">
        <h2 className="text-base font-bold">{placeName}</h2>
        <p className="text-xs text-subGray ">한식</p>
      </div>
      <div className="flex items-center gap-1.5">
        <h4 className="text-xs font-medium">4.5</h4>
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
      <p className="text-xs">{roadAddressName}</p>
      <div className="flex gap-1">
        <p className="text-xs font-medium">{`${(distance / 1000).toFixed(1)}km`}</p>
        <p className="text-xs font-bold">|</p>
        <p className="text-xs text-mainG">{phone}</p>
      </div>
      <div className="mt-0.5 flex justify-between">
        <div className="h-[60px] w-[95px] bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F166DC3354E4DE28425')] bg-cover bg-center"></div>
        <div className="h-[60px] w-[95px] bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fb9db7f48894e9e0b2c6d22ba7330d0f6a1aa84b5%3Foriginal')] bg-cover bg-center"></div>
        <div className="h-[60px] w-[95px] bg-[url('https://img1.kakaocdn.net/cthumb/local/R736x0.q50/?fname=https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyNDA0MTdfMTEw%2FMDAxNzEzMzU2OTgyNTg0.R-8WU3e-khviuz6oOIK8UvI038ixpd1lwKdZMFykobMg.6uzd42BTrjFkgJPXlIMoL9xDmzXHWYtXTrxxDhwNxcMg.JPEG%2FIMG_3479.jpg%3Ftype%3Dw773')] bg-cover bg-center"></div>
      </div>
      <button
        onClick={handleClickKaKaoBtn}
        className="btn btn-xs absolute right-2.5 w-fit gap-0 rounded-full border-[#258FFF] bg-white text-xs"
      >
        kakao<strong>map</strong>
        <FaLocationArrow className="text-mainY" />
      </button>
    </div>
  );
}
