import type { ErrorResponse } from "@/services/Api";

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === "object" && error !== null && "error" in error;
};
