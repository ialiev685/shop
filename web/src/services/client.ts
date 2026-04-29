import {
  type AxiosInstance,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { Api } from "./api";
import { routesMap } from "@/shared/routes";

class ApiClient {
  public api: Api<unknown>;
  private instance: AxiosInstance;

  constructor() {
    this.api = new Api({ baseURL: import.meta.env.VITE_APP_API_URL });
    this.instance = this.api.instance;
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
            const response = await this.api.auth.refreshCreate({
              withCredentials: true,
            });
            const accessToken = response.data.accessToken;
            if (accessToken) {
              localStorage.setItem("token", accessToken);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            return this.instance(originalRequest);
          } catch (refreshError) {
            localStorage.clear();
            window.location.href = routesMap["/login"];
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );
  }
}

export const apiClient = new ApiClient().api;
