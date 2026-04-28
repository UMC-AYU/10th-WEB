import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
} from "./Auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/v1";

export const GOOGLE_LOGIN_URL = `${API_BASE_URL}/auth/google/login`;

type ApiResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type AuthTokens = {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const refreshToken = getRefreshToken();

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      !refreshToken ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post<ApiResponse<AuthTokens>>(`${API_BASE_URL}/auth/refresh`, {
            refresh: refreshToken,
          })
          .then((response) => {
            const tokens = response.data.data;

            saveTokens(tokens.accessToken, tokens.refreshToken);
            return tokens.accessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      removeTokens();
      window.dispatchEvent(new Event("auth-expired"));
      return Promise.reject(refreshError);
    }
  },
);

export async function signIn(email: string, password: string) {
  const response = await publicApi.post<ApiResponse<AuthTokens>>("/auth/signin", {
    email,
    password,
  });

  const tokens = response.data.data;
  saveTokens(tokens.accessToken, tokens.refreshToken);

  return tokens;
}

export async function signUp(email: string, password: string) {
  await publicApi.post("/auth/signup", {
    name: email.split("@")[0],
    email,
    password,
  });
}
