import { axiosInstance } from "./axios";

export const signIn = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/v1/auth/signin", {
    email,
    password,
  });

  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);

  return data;
};

export const getMyInfo = async () => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};
