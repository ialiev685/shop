import { useMemo, type PropsWithChildren } from "react";
import { AuthContext, type AuthContextType } from "./context";

import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => Promise.resolve(),
    staleTime: 0,
  });

  const providerValue = useMemo<AuthContextType>(
    () => ({
      isAuthorized: false,
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
