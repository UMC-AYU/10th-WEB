import useForm from "../../hooks/useForm";
import Button from "../button/Button";
import LoginInput from "../auth/LoginInput";
import hideIcon from "../../assets/password-hide.png";
import showIcon from "../../assets/password-show.png";

import { validateLogin } from "../../utils/login";
import type { LoginFormValues } from "../../types/auth";
import { useState } from "react";

const LoginForm = () => {
  const { values, errors, touched, getInputProps } = useForm<LoginFormValues>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const [showPassword, setShowPassword] = useState(false);

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
        <div>
          <LoginInput
            label="password"
            {...getInputProps("password")}
            className="bg-neutral-900 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bf] rounded-sm"
            placeholder={"비밀번호를 입력해주세요!"}
            error={errors?.password}
            touched={touched?.password}
          />
          <img
            src={showPassword ? hideIcon : showIcon}
            onClick={() => setShowPassword((prev) => !prev)}
            className="w-5 absolute right-3 top-3.5 cursor-pointer"
          />
        </div>
        <Button type="button" onClick={handleSubmit} disabled={isDisabled}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
