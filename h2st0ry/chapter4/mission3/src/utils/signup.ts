import type { SignUpFormValues } from "../types/auth";

export const validateSignup = (
  values: SignUpFormValues
): Partial<Record<keyof SignUpFormValues, string>> => {
  const errors: Partial<Record<keyof SignUpFormValues, string>> = {};

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
  if (!values.confirmPassword) {
    errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  // 닉네임 확인
  if (!values.nickname) {
    errors.nickname = "닉네임을 입력해주세요.";
  }

  return errors;
};