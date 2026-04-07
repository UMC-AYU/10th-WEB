import LoginForm from "../components/auth/LoginForm.tsx";
import SocialLogin from "../components/auth/SocialLogin.tsx";
import PageHeader from "../components/PageHeader.tsx";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex flex-col w-[300px] gap-6">
        <PageHeader title="로그인" />
        <div className="flex-col items-center justify-center flex gap-4">
          <SocialLogin />
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-white" />
            <span className="mx-3 text-white text-sm">OR</span>
            <div className="flex-1 h-px bg-white" />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
