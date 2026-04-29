import googleLogo from "../../assets/google-logo.png";

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="relative w-[300px] border border-gray-300 p-3 rounded-md flex items-center justify-center"
      >
        <img
          src={googleLogo}
          alt="google"
          className="absolute left-3 w-5 h-5"
        />
        <span>구글 로그인</span>
      </button>
    </div>
  );
};

export default SocialLogin;
