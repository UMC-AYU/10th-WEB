import { useSearchParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Button from "../button/Button";
import LoginInput from "./LoginInput";
import SocialLogin from "./SocialLogin";
import type { SignUpFormValues } from "../../types/auth";
import { validateSignup } from "../../utils/signup";
import { useState } from "react";
import showIcon from "../../assets/password-show.png";
import hideIcon from "../../assets/password-hide.png";

const SignUpForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const step = searchParams.get("step") || "email";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, errors, touched, getInputProps } = useForm<SignUpFormValues>({
    initialValue: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignup,
  });

  const handleNext = () => {
    if (!values.email || errors.email) return;
    setSearchParams({ step: "password" });
  };

  const handleSubmit = () => {
    console.log(values);
  };

  const isDisabled =
    step === "email"
      ? !values.email || !!errors.email
      : !values.password || !!errors.password;

  return (
    <div className="flex flex-col gap-4 w-[300px]">
      {step === "email" && (
        <>
          <SocialLogin />
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-white" />
            <span className="mx-3 text-white text-sm">OR</span>
            <div className="flex-1 h-px bg-white" />
          </div>
          <LoginInput
            {...getInputProps("email")}
            type="email"
            placeholder="이메일을 입력해주세요!"
            error={errors?.email}
            touched={touched?.email}
          />

          <Button onClick={handleNext} disabled={isDisabled}>
            다음
          </Button>
        </>
      )}

      {step === "password" && (
        <>
          <h1>{values.email}</h1>
          <div className="relative">
            <LoginInput
              {...getInputProps("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요!"
              error={errors?.password}
              touched={touched?.password}
              className="pr-10"
            />
            <img
              src={showPassword ? hideIcon : showIcon}
              alt="toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[13px] w-5 h-5 cursor-pointer"
            />
          </div>
          <div className="relative">
            <LoginInput
              {...getInputProps("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              error={errors?.confirmPassword}
              touched={touched?.confirmPassword}
              className="pr-10"
            />
            <img
              src={showConfirmPassword ? hideIcon : showIcon}
              alt="toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[13px] w-5 h-5 cursor-pointer"
            />
          </div>

          <Button onClick={handleSubmit} disabled={isDisabled}>
            다음
          </Button>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
