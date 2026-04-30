import type { AxiosError } from "axios";
import { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { Auth } from "./Auth";
import { TOKEN_KEY } from "@/shared/configs";

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
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => error,
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error.response?.status === 401 &&
          error.config &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await this.auth.refreshCreate({
              withCredentials: true,
            });
            const accessToken = response.data.accessToken;
            if (accessToken) {
              localStorage.setItem(TOKEN_KEY, accessToken);
            }

            return this.instance.request(originalRequest);
          } catch (_error) {
            // localStorage.clear();
          }
        }

        throw error;
      },
    );
  }
}

export const auth = new ApiClient().auth;
