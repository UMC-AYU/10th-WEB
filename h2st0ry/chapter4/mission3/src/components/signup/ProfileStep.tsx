import type { StepProps } from "../../types/signupForm";
import LoginInput from "../auth/LoginInput";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

interface ProfileStepProps extends StepProps {
  onSubmit: () => void;
}

const ProfileStep = ({
  values,
  errors,
  touched,
  getInputProps,
  onSubmit,
}: ProfileStepProps) => {
  const navigate = useNavigate();
  const isDisabled = !values.nickname || !!errors.nickname;

  const handleSubmit = () => {
    onSubmit();
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-2xl font-bold">프로필 작성</h2>

      <LoginInput
        label="nickname"
        {...getInputProps("nickname")}
        name="nickname"
        type="nickname"
        placeholder="닉네임을 입력해주세요!"
        error={errors?.nickname}
        touched={touched?.nickname}
      />

      <Button type="button" onClick={handleSubmit} disabled={isDisabled}>
        회원가입 완료
      </Button>
    </div>
  );
};

export default ProfileStep;
