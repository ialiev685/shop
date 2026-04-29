import type { AxiosError } from "axios";
import { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { Auth } from "./Auth";

class ApiClient {
  public auth: Auth<unknown>;
  private instance: AxiosInstance;

  constructor() {
    this.auth = new Auth({ baseURL: import.meta.env.VITE_APP_API_URL });
    this.instance = this.auth.instance;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response.headers.coo,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.auth.refreshCreate({
              withCredentials: true,
            });
            const accessToken = response.data.accessToken;
            if (accessToken) {
              localStorage.setItem("token", accessToken);
            }

            return this.instance.request(originalRequest);
          } catch (_error) {
            localStorage.clear();
          }
        }

        throw error;
      },
    );
  }
}

export const auth = new ApiClient().auth;
