export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
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
  aboutMe: string;
  webSite: string;
}
