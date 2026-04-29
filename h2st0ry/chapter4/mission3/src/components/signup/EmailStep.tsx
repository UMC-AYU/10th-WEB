import type { StepProps } from "../../types/signupForm";
import LoginInput from "../auth/LoginInput";
import SocialLogin from "../auth/SocialLogin";
import Button from "../button/Button";

interface EmailStepProps extends StepProps {
  onNext: () => void;
}

const EmailStep = ({
  values,
  errors,
  touched,
  getInputProps,
  onNext,
}: EmailStepProps) => {
  const isDisabled = !!errors.email || !values.email;

  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <SocialLogin />

      <div className="flex items-center my-2">
        <div className="flex-1 h-px bg-white" />
        <span className="mx-10 text-md text-white">OR</span>
        <div className="flex-1 h-px bg-white" />
      </div>

      <LoginInput
        label="email"
        {...getInputProps("email")}
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요!"
        error={errors?.email}
        touched={touched?.email}
      />

      <Button type="button" onClick={onNext} disabled={isDisabled}>
        다음
      </Button>
    </div>
  );
};

export default EmailStep;
