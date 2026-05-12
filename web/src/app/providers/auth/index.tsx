import { useCallback, useMemo, type PropsWithChildren } from "react";
import { AuthContext, type AuthContextType } from "./context";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "@/entities/user";
import { TOKEN_KEY } from "@/shared/configs";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useQuery({
    ...userQueries.currentUserQuery,
    staleTime: 0,
  });
  const queryclient = useQueryClient();
  const logoutMutation = useMutation(userQueries.logoutMutation);

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        queryclient.setQueryData(userQueries.currentUserKey, null);
        localStorage.removeItem(TOKEN_KEY);
      },
    });
  }, [logoutMutation, queryclient]);

  const providerValue = useMemo<AuthContextType>(
    () => ({
      isAuthorized: Boolean(data),
      isLoading,
      user: data,
      logout: handleLogout,
    }),
    [data, handleLogout, isLoading],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
