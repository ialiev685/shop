import type { CurrentUserListData } from "@/services/data-contracts";
import { createContext, useContext } from "react";

export type AuthContextType = {
  user?: CurrentUserListData;
  isAuthorized: boolean;
  isLoading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth должен быть внутри провайдера");
  }

  return context;
};
