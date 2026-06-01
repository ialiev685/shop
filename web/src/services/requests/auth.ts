import { auth } from "../client";
import type {
  ForgotPasswordCreatePayload,
  LoginCreatePayload,
  RegisterCreatePayload,
  ResetPasswordCreatePayload,
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

export const forgotPassword = async (params: ForgotPasswordCreatePayload) => {
  const { data } = await auth.forgotPasswordCreate(params);
  return data;
};

export const resetPassword = async (params: ResetPasswordCreatePayload) => {
  const { data } = await auth.resetPasswordCreate(params);
  return data;
};
