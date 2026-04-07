import type { SignUpFormValues } from "../types/auth";

export const validateSignup = (values: SignUpFormValues) => {
  const errors: Record<keyof SignUpFormValues, string> = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // 이메일
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 비밀번호
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  }

  // 비밀번호 확인
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  return errors;
};
