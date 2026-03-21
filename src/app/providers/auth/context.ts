import type { User } from "@/services/Api";
import { createContext, useContext } from "react";

export type AuthContextType = {
  user?: User;
  isAuthorized: boolean;
  isLoading: boolean;
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
