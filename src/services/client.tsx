import { IconX } from "@tabler/icons-react";
import { Api, type ErrorResponse } from "./Api";
import { notifications } from "@mantine/notifications";

const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === "object" && error !== null && "error" in error;
};

export class HttpError extends Error {
  public status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

class RequestApi {
  private apiAuth: Api<unknown>;

  constructor(baseUrl: string) {
    this.apiAuth = new Api({ baseUrl });
  }

  private async request<T>(
    apiCall: () => Promise<{ data: T }>,
    errorMessage: string = "Ошибка запроса",
  ): Promise<T> {
    try {
      const response = await apiCall();
      return response.data;
    } catch (error: unknown) {
      if (isErrorResponse(error)) {
        if (error.status !== 401) {
          notifications.show({
            icon: <IconX />,
            title: "Ошибка",
            message: error.error.message,
            color: "red",
            position: "top-center",
          });
        }

        throw new HttpError(error.error.message, error.status);
      }

      if (error instanceof Error) {
        throw new HttpError(error.message);
      }

      throw new HttpError(errorMessage);
    }
  }

  private getToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }

  public async getUser() {
    const token = this.getToken();

    return this.request(
      () =>
        this.apiAuth.auth.getAuth({
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }),
      "Ошибка получения пользователя",
    );
  }

  public async signIn(params: { username: string; password: string }) {
    return this.request(
      () =>
        this.apiAuth.auth.loginCreate(params, {
          headers: { "Content-Type": "application/json" },
        }),
      "Ошибка получения пользователя",
    );
  }
}

export const requestApi = new RequestApi("https://dummyjson.com");
