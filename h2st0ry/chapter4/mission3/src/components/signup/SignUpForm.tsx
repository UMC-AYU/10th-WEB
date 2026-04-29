import { useSearchParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { validateSignup } from "../../utils/signup";

import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import ProfileStep from "./ProfileStep";

const SignUpForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "email";

  const { values, errors, touched, getInputProps } = useForm({
    initialValue: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    validate: validateSignup,
  });

  const nextStep = (next: string) => {
    setSearchParams({ step: next });
  };

  const handleSubmit = () => {
    console.log(values);
  };

  switch (step) {
    case "email":
      return (
        <EmailStep
          values={values}
          errors={errors}
          getInputProps={getInputProps}
          onNext={() => nextStep("password")}
          touched={touched}
        />
      );

    case "password":
      return (
        <PasswordStep
          values={values}
          errors={errors}
          getInputProps={getInputProps}
          onNext={() => nextStep("profile")}
          touched={touched}
        />
      );

    case "profile":
      return (
        <ProfileStep
          values={values}
          errors={errors}
          getInputProps={getInputProps}
          onSubmit={handleSubmit}
          touched={touched}
        />
      );

    default:
      return null;
  }
};

export default SignUpForm;
