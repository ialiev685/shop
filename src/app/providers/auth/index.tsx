import { useEffect, useMemo, type PropsWithChildren } from "react";
import { AuthContext, type AuthContextType } from "./context";
import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { isErrorResponse } from "@/shared/lib";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/configs";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    data: user,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => requestApi.getUser(),
    staleTime: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      if (isErrorResponse(error) && error.status === 401) {
        navigate(routes.login);
      }
    }
  }, [error, isError, navigate]);

  const providerValue = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthorized: Boolean(user) || !isError,
      isLoading,
    }),
    [isError, isLoading, user],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
