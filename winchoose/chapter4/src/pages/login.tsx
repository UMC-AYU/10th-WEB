import axios from "axios";
import { useState } from "react";
import type { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

type LoginFormValues = {
  email: string;
  password: string;
};

type SignInResponseData = {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type ApiResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T | null;
};

type ApiErrorResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: null;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/v1";

const LoginPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, isValid, register, handleSubmit } = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validators: {
      email: [
        (value) =>
          value.trim() === ""
            ? "이메일을 입력해주세요."
            : undefined,
        (value) =>
          emailPattern.test(value)
            ? undefined
            : "유효하지 않은 이메일 형식입니다.",
      ],
      password: [
        (value) =>
          value.trim() === ""
            ? "비밀번호를 입력해주세요."
            : undefined,
        (value) =>
          value.length >= 6
            ? undefined
            : "비밀번호는 최소 6자 이상이어야 합니다.",
      ],
    },
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
  };

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { data } = await axios.post<ApiResponse<SignInResponseData>>(
        `${API_BASE_URL}/auth/signin`,
        values,
      );

      if (!data.data) {
        throw new Error("로그인 응답 데이터가 올바르지 않아요.");
      }

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: data.data.id,
          name: data.data.name,
          email: values.email,
        }),
      );

      navigate("/", {
        replace: true,
        state: { loginMessage: `${data.data.name}님, 로그인되었어요.` },
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        axiosError.response?.data.message ||
        (error instanceof Error ? error.message : "") ||
        "로그인에 실패했어요. 이메일과 비밀번호를 다시 확인해 주세요.";

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#071426] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,63,156,0.12),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),_transparent_28%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm pt-8">
          <button
            type="button"
            onClick={handleGoBack}
            className="mb-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-2xl text-zinc-200 transition hover:bg-white/10 hover:text-white"
            aria-label="이전 페이지로 이동"
          >
            &lt;
          </button>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8">
            <h1 className="text-center text-2xl font-bold tracking-tight text-white">
              로그인
            </h1>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/35 bg-transparent px-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/6"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-sm font-bold text-[#ea4335]">
                G
              </span>
              구글 로그인
            </button>

            <div className="my-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-300">
              <span className="h-px flex-1 bg-white/20" />
              OR
              <span className="h-px flex-1 bg-white/20" />
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="이메일을 입력해주세요!"
                  className="h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                />
                {errors.email ? (
                  <p className="mt-2 text-xs font-medium text-rose-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="비밀번호를 입력해주세요!"
                  className="h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                />
                {errors.password ? (
                  <p className="mt-2 text-xs font-medium text-rose-400">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              {submitError ? (
                <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  {submitError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="mt-2 h-12 w-full rounded-xl bg-[#ff3fa2] text-sm font-semibold text-white transition hover:bg-[#ff5bb0] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"
              >
                {isSubmitting ? "로그인 중..." : "로그인"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-300">
              아직 계정이 없나요?{" "}
              <Link
                to="/"
                className="font-semibold text-[#ff67b8] transition hover:text-[#ff8dcb]"
              >
                홈으로 돌아가기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
