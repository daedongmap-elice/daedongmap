export interface SignUpRequest {
  email: string;
  password: string;
  nickName: string;
  phoneNumber: string;
}

export interface SignUpData extends SignUpRequest {
  checkPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ProfileData {
  nickname: string;
  status: string;
  webSite: string; //선택
}

export interface UserInfo {
  nickName: string;
  status: string;
}

export interface LatLngData {
  lat: number;
  lng: number;
}

export interface PlaceData {
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
}
