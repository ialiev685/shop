import { Api, type ErrorResponse } from "./Api";

const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === "object" && error !== null && "error" in error;
};

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
        throw new Error(error.error.message);
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error(errorMessage);
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
}

export const requestApi = new RequestApi("https://dummyjson.com");
