export interface RequestSignupDto {
  email: string;
  password: string;
}

export interface ResponseSignupDto {
  id: number;
  email: string;
}

export interface RequestSigninDto {
  email: string;
  password: string;
}

export interface ResponseSigninDto {
  accessToken: string;
}

export interface ResponseMyInfoDto {
  userId: number;
}