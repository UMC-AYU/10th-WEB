import axios from "axios";
import { useMemo, useState } from "react";
import type { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

type SignupStep = "email" | "password" | "profile";

type SignUpResponseData = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/v1";

const signupBaseSchema = z.object({
  email: z.email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z
    .string()
    .min(6, "비밀번호는 6자 이상이어야 합니다."),
  passwordConfirm: z.string(),
  name: z
    .string()
    .trim()
    .min(1, "닉네임을 입력해주세요."),
});

const signupSchema = signupBaseSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  },
);

type SignupFormValues = z.infer<typeof signupSchema>;

const emailStepSchema = signupBaseSchema.pick({ email: true });
const profileStepSchema = signupBaseSchema.pick({ name: true });
const passwordStepSchema = z
  .object({
    password: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

const EyeIcon = ({ open }: { open: boolean }) => {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.7A3 3 0 0 0 13.3 13.4" />
      <path d="M9.9 5.1A11.4 11.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-4 4.8" />
      <path d="M6.6 6.7C4 8.4 2 12 2 12s3.5 7 10 7c1.9 0 3.5-.4 4.9-1" />
    </svg>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("email");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });

  const email = watch("email");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const name = watch("name");

  const canGoNextFromEmail = useMemo(() => {
    return emailStepSchema.safeParse({ email }).success;
  }, [email]);

  const canGoNextFromPassword = useMemo(() => {
    return passwordStepSchema.safeParse({ password, passwordConfirm }).success;
  }, [password, passwordConfirm]);

  const canSubmit = useMemo(() => {
    return profileStepSchema.safeParse({ name }).success;
  }, [name]);

  const handleBack = () => {
    if (step === "profile") {
      setStep("password");
      return;
    }

    if (step === "password") {
      setStep("email");
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
  };

  const handleEmailNext = async () => {
    const isStepValid = await trigger("email");

    if (isStepValid) {
      setStep("password");
    }
  };

  const handlePasswordNext = async () => {
    const isStepValid = await trigger(["password", "passwordConfirm"]);

    if (isStepValid && canGoNextFromPassword) {
      setStep("profile");
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await axios.post<ApiResponse<SignUpResponseData>>(
        `${API_BASE_URL}/auth/signup`,
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
      );

      navigate("/", {
        replace: true,
        state: { authMessage: `${values.name}님, 회원가입이 완료되었어요.` },
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        axiosError.response?.data.message ||
        (error instanceof Error ? error.message : "") ||
        "회원가입에 실패했어요. 입력 정보를 다시 확인해 주세요.";

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
            onClick={handleBack}
            className="mb-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-2xl text-zinc-200 transition hover:bg-white/10 hover:text-white"
            aria-label="이전 화면으로 이동"
          >
            &lt;
          </button>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8">
            <h1 className="text-center text-2xl font-bold tracking-tight text-white">
              회원가입
            </h1>

            {step === "email" ? (
              <>
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
              </>
            ) : null}

            <form
              className={step === "profile" ? "mt-8 space-y-4" : "space-y-4"}
              onSubmit={onSubmit}
            >
              {step === "email" ? (
                <>
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="이메일을 입력해주세요!"
                      className="h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                    />
                    {errors.email ? (
                      <p className="mt-2 text-xs font-medium text-rose-400">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleEmailNext}
                    disabled={!canGoNextFromEmail}
                    className="h-12 w-full rounded-xl bg-[#ff3fa2] text-sm font-semibold text-white transition hover:bg-[#ff5bb0] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"
                  >
                    다음
                  </button>
                </>
              ) : null}

              {step === "password" ? (
                <>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-200">
                    <span className="mr-2 text-zinc-400">@</span>
                    {email}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해주세요!"
                        className="h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-zinc-400 transition hover:text-zinc-200"
                        aria-label={
                          showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                        }
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                    {errors.password ? (
                      <p className="mt-2 text-xs font-medium text-rose-400">
                        {errors.password.message}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        {...register("passwordConfirm")}
                        type={showPasswordConfirm ? "text" : "password"}
                        placeholder="비밀번호를 다시 한 번 입력해주세요!"
                        className="h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswordConfirm((previous) => !previous)
                        }
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-zinc-400 transition hover:text-zinc-200"
                        aria-label={
                          showPasswordConfirm
                            ? "비밀번호 재확인 숨기기"
                            : "비밀번호 재확인 보기"
                        }
                      >
                        <EyeIcon open={showPasswordConfirm} />
                      </button>
                    </div>
                    {errors.passwordConfirm ? (
                      <p className="mt-2 text-xs font-medium text-rose-400">
                        {errors.passwordConfirm.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handlePasswordNext}
                    disabled={!canGoNextFromPassword}
                    className="h-12 w-full rounded-xl bg-[#ff3fa2] text-sm font-semibold text-white transition hover:bg-[#ff5bb0] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"
                  >
                    다음
                  </button>
                </>
              ) : null}

              {step === "profile" ? (
                <>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-200">
                    <span className="mr-2 text-zinc-400">@</span>
                    {email}
                  </div>

                  <div className="flex flex-col items-center gap-4 pb-2 pt-2">
                    <div className="grid h-32 w-32 place-items-center rounded-full bg-[radial-gradient(circle_at_top,_#f4f4f5,_#d4d4d8_60%,_#a1a1aa)] shadow-lg">
                      <div className="relative h-20 w-20 rounded-full bg-white/70">
                        <div className="absolute left-1/2 top-3 h-9 w-9 -translate-x-1/2 rounded-full bg-zinc-100" />
                        <div className="absolute bottom-0 left-1/2 h-10 w-16 -translate-x-1/2 rounded-t-full bg-zinc-100" />
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">
                      프로필 이미지 업로드는 다음 미션에서 연결해볼게요.
                    </p>
                  </div>

                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="닉네임을 입력해주세요!"
                      className="h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                    />
                    {errors.name ? (
                      <p className="mt-2 text-xs font-medium text-rose-400">
                        {errors.name.message}
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
                    disabled={!canSubmit || isSubmitting}
                    className="h-12 w-full rounded-xl bg-[#ff3fa2] text-sm font-semibold text-white transition hover:bg-[#ff5bb0] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-zinc-500"
                  >
                    {isSubmitting ? "가입 중..." : "회원가입 완료"}
                  </button>
                </>
              ) : null}
            </form>

            <p className="mt-6 text-center text-sm text-zinc-300">
              이미 계정이 있나요?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#ff67b8] transition hover:text-[#ff8dcb]"
              >
                로그인하러 가기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
