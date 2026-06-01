import type { AxiosError } from "axios";
import { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { Auth } from "./Auth";
import { Api } from "./Api";

import { TOKEN_KEY } from "@/shared/configs";
import { notifications } from "@mantine/notifications";

type AxiosErrorResponse = AxiosError<{ message?: string }>;

class InterceptorManager {
  private instance: AxiosInstance;
  private refreshHandler: () => Promise<string | null>;
  constructor(
    instance: AxiosInstance,
    refreshHandler: () => Promise<string | null>,
  ) {
    this.instance = instance;
    this.refreshHandler = refreshHandler;
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
      async (error: AxiosErrorResponse) => {
        if (
          error.response?.status === 401 &&
          error.config &&
          !error.config.url?.includes("/auth/refresh")
        ) {
          try {
            const accessToken = await this.refreshHandler();
            if (accessToken) {
              localStorage.setItem(TOKEN_KEY, accessToken);
            }

            return this.instance.request(error.config);
          } catch (error) {
            console.log("Ошибка авторизации", error);
          }
        }

        if (error.response?.status !== 401) {
          notifications.show({
            position: "top-center",
            title: "Ошибка",
            message:
              error.response?.data.message ||
              "Произошла ошибка при выполнении запроса",
            color: "red",
            autoClose: 5000,
          });
        }

        throw error;
      },
    );
  }
}

class ApiClient {
  public auth: Auth<unknown>;
  public api: Api<unknown>;

  constructor() {
    this.auth = new Auth({
      baseURL: import.meta.env.VITE_APP_API_URL,
      withCredentials: true,
    });
    this.api = new Api({
      baseURL: import.meta.env.VITE_APP_API_URL,
      withCredentials: true,
    });
    new InterceptorManager(this.auth.instance, () => this.refreshToken());
    new InterceptorManager(this.api.instance, () => this.refreshToken());
  }

  public async refreshToken() {
    const response = await this.auth.refreshCreate({
      withCredentials: true,
    });
    return response.data.accessToken || null;
  }
}

const client = new ApiClient();
export const auth = client.auth;
export const api = client.api;
