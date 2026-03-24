interface ErrorResponse {
  data: null;
  error: {
    message: string;
  };
  status: number;
}

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === "object" && error !== null && "error" in error;
};
