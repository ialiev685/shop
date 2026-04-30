import { useMemo, type PropsWithChildren } from "react";
import { AuthContext, type AuthContextType } from "./context";

import { useQuery } from "@tanstack/react-query";
import { currentUser } from "@/services/requests/auth";
import { userQueries } from "@/entities/user";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useQuery({
    queryKey: userQueries.currentUser,
    queryFn: currentUser,
    staleTime: 0,
  });

  const providerValue = useMemo<AuthContextType>(
    () => ({
      isAuthorized: Boolean(data),
      isLoading,
    }),
    [data, isLoading],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
