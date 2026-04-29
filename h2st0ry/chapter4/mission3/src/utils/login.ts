import type { LoginFormValues } from "../types/auth";

export const validateLogin = (values: LoginFormValues) => {
  const errors: Record<keyof LoginFormValues, string> = {
    email: "",
    password: "",
  };

  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  return errors;
};
