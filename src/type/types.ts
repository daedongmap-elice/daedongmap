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

export interface UserInfo {
  profileImage: string;
  nickName: string;
  status: string;
  webSite?: string;
}

export interface LatLngData {
  lat: number;
  lng: number;
}

export interface PlaceInfoData {
  kakaoPlaceId: number;
  placeName: string;
  addressName: string;
  categoryName: string;
  roadAddressName: string;
  placeUrl: string;
  phone: string | null;
  x: number;
  y: number;
}

export interface PlaceData extends PlaceInfoData {
  averageRating: number;
  id: number;
  reviewCnt: string;
  reviewImagePath: string;
}

export interface ReviewResponse {
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

export interface ModalProps {
  isClickModal?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isClickDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonDisabled?: boolean;
  type?: string;
  follow?: any;
}
