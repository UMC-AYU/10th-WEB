import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);

      navigate("/member");
    } catch (e) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80 flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center text-[#4b2e2e]">
          로그인
        </h1>

        {message && (
          <div className="bg-[#fdf2f2] text-[#a94442] text-sm p-2 rounded text-center">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="bg-[#6f4e37] text-white py-2 rounded-lg hover:bg-[#5a3e2b]"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;