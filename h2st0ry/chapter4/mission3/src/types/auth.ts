// 공통 필드
export type AuthBase = {
  email: string;
  password: string;
};

// 로그인
export type LoginFormValues = AuthBase;

// 회원가입
export type SignUpFormValues = AuthBase & {
  confirmPassword: string;
  nickname: string;
};