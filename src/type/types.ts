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
  nickName: string;
  status: string;
  webSite: string; //선택
}

export interface UserInfo {
  profileImage: string;
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

export interface ReviewGalleryResponse {
  id: number;
  kakaoPlaceId: number;
  placeName: string;
  user: {
    id: number;
    nickName: string;
    email: string;
    profileImagePath: string;
  };
  content: string;
  reviewImageList: [
    {
      id: number;
      userId: number;
      reviewId: number;
      filePath: string;
    },
  ];
  tasteRating: number;
  hygieneRating: number;
  kindnessRating: number;
  averageRating: number;
  likeCount: number;
  createdAt: string | undefined;
  updatedAt: string;
}

export interface ReviewDetailResponse {
  id: number;
  kakaoPlaceId: number;
  placeName: string;
  user: {
    id: number;
    nickName: string;
    email: string;
    profileImagePath: string;
  };
  content: string;
  reviewImageDtoList: [
    {
      id: number;
      userId: number;
      reviewId: number;
      filePath: string;
    },
  ];
  tasteRating: number;
  hygieneRating: number;
  kindnessRating: number;
  averageRating: number;
  likeCount: number;
  createdAt: string | undefined;
  updatedAt: string;
}
