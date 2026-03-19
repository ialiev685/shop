import type { User } from "@/services/Api";
import { createContext } from "react";

type AuthContextType = {
  user?: User;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
