import SignUpForm from "../components/signup/SignUpForm";
import SocialLogin from "../components/auth/SocialLogin";
import PageHeader from "../components/PageHeader";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex flex-col w-[300px] gap-6">
        <PageHeader title="회원가입" />
        <div className="flex-col items-center justify-center flex gap-4">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
