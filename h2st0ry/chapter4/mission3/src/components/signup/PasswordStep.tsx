import type { StepProps } from "../../types/signupForm";
import LoginInput from "../auth/LoginInput";
import Button from "../button/Button";
import email from "../../assets/email.png";
import { useState } from "react";
import hideIcon from "../../assets/password-hide.png";
import showIcon from "../../assets/password-show.png";

interface PasswordStepProps extends StepProps {
  onNext: () => void;
}

const PasswordStep = ({
  values,
  errors,
  touched,
  getInputProps,
  onNext,
}: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isDisabled =
    !!errors.password ||
    !!errors.confirmPassword ||
    !values.password ||
    !values.confirmPassword;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-2 ">
        <img src={email} className="w-5 h-5" />
        <h3 className="text-md">{values.email}</h3>
      </div>

      <div className="relative">
        <LoginInput
          label="password"
          {...getInputProps("password")}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요!"
          error={errors?.password}
          touched={touched?.password}
        />

        <img
          src={showPassword ? hideIcon : showIcon}
          onClick={() => setShowPassword((prev) => !prev)}
          className="w-5 absolute right-3 top-3.5 cursor-pointer"
        />
      </div>

      <div className="relative">
        <LoginInput
          label="confirmPassword"
          {...getInputProps("confirmPassword")}
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요!"
          error={errors?.confirmPassword}
          touched={touched?.confirmPassword}
        />
        <img
          src={showConfirmPassword ? hideIcon : showIcon}
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="w-5 absolute right-3 top-3.5 cursor-pointer"
        />
      </div>

      <Button type="button" onClick={onNext} disabled={isDisabled}>
        다음
      </Button>
    </div>
  );
};

export default PasswordStep;
