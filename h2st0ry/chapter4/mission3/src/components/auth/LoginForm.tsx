import useForm from "../../hooks/useForm";
import Button from "../button/Button";
import LoginInput from "./LoginInput";

import { validateLogin } from "../../utils/login";
import type { LoginFormValues } from "../../types/auth";

const LoginForm = () => {
  const { values, errors, touched, getInputProps } = useForm<LoginFormValues>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log(values);
  };

  // 오류가 하나라도 있거나 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-3">
        <LoginInput
          label="email"
          {...getInputProps("email")}
          name="email"
          type={"email"}
          placeholder={"이메일을 입력해주세요!"}
          error={errors?.email}
          touched={touched?.email}
        />
        <LoginInput
          label="password"
          {...getInputProps("password")}
          className="bg-neutral-900 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bf] rounded-sm"
          placeholder={"비밀번호를 입력해주세요!"}
          error={errors?.password}
          touched={touched?.password}
        />
        <Button type="button" onClick={handleSubmit} disabled={isDisabled}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
