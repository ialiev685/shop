import { useMemo, type PropsWithChildren } from "react";
import { AuthContext, type AuthContextType } from "./context";
import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => requestApi.getUser(),
    staleTime: 0,
  });

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
