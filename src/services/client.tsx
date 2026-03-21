import { IconX } from "@tabler/icons-react";
import { Api } from "./Api";
import { notifications } from "@mantine/notifications";
import { isErrorResponse } from "@/shared/lib";

export type LoginData = {
  username: string;
  password: string;
  shouldRemember: boolean;
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

  private getToken = () => {
    return (
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken")
    );
  };

  private setToken = (accessToken: string, shouldRemember: boolean) => {
    if (shouldRemember) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      sessionStorage.setItem("accessToken", accessToken);
    }
  };

  public getUser = async () => {
    const token = this.getToken();

    return this.request(
      () =>
        this.apiAuth.auth.getAuth({
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }),
      "Ошибка получения пользователя",
    );
  };

  public signIn = async (params: LoginData) => {
    console.log("params", params);
    // emilys
    // emilyspass
    const response = await this.request(
      () => this.apiAuth.auth.loginCreate(params, {}),
      "Ошибка при авторизации пользователя",
    );
    this.setToken(response.accessToken, params.shouldRemember);
    return response;
  };
}

// export const requestApi = new RequestApi("/api");
export const requestApi = new RequestApi("https://dummyjson.com");
