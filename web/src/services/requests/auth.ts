import { auth } from "../client";
import type {
  LoginCreatePayload,
  RegisterCreatePayload,
} from "../data-contracts";

export const login = async (params: LoginCreatePayload) => {
  const { data } = await auth.loginCreate(params);
  return data;
};

export const register = async (params: RegisterCreatePayload) => {
  const { data } = await auth.registerCreate(params);
  return data;
};

export const currentUser = async () => {
  const { data } = await auth.currentUserList();
  return data;
};

export const logout = async () => {
  const { data } = await auth.logoutCreate();
  return data;
};
