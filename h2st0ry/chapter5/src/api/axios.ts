import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// 🔥 추가 (파일 최상단)
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // refresh 요청은 제외
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔥 이미 refresh 중이면 기다림
        if (!isRefreshing) {
          isRefreshing = true;

          const refreshToken = localStorage.getItem("refreshToken");

          refreshPromise = axios
            .post("http://localhost:8000/v1/auth/refresh", {
              refresh: refreshToken,
            })
            .then((res) => {
              const newAccessToken = res.data.data.accessToken;
              const newRefreshToken = res.data.data.refreshToken;

              localStorage.setItem("accessToken", newAccessToken);
              localStorage.setItem("refreshToken", newRefreshToken);

              return newAccessToken;
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        // 🔥 여기서 기다림
        const newAccessToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);