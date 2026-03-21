import { colorsTuple, type MantineColorsTuple } from "@mantine/core";

export type CustomColors =
  | "gray-auth-1"
  | "gray-auth-2"
  | "gray-auth-3"
  | "gray-auth-4"
  | "gray-auth-5"
  | "gray-auth-6"
  | "gray-auth-7"
  | "purple-auth"
  | "blue-auth"
  | "gray-main-1"
  | "gray-main-2"
  | "gray-main-3"
  | "gray-main-4"
  | "gray-main-5"
  | "purple-main";

export const colors: Record<CustomColors, MantineColorsTuple> = {
  "gray-auth-1": colorsTuple("#232323"),
  "gray-auth-2": colorsTuple("#6C6C6C"),
  "gray-auth-3": colorsTuple("#9C9C9C"),
  "gray-auth-4": colorsTuple("#C9C9C9"),
  "gray-auth-5": colorsTuple("#e0e0e0"),
  "gray-auth-6": colorsTuple("#EDEDED"),
  "gray-auth-7": colorsTuple("#f9f9f9"),
  "purple-auth": colorsTuple("#242EDB"),
  "blue-auth": colorsTuple("#367AFF"),
  "gray-main-1": colorsTuple("#333333"),
  "gray-main-2": colorsTuple("#4F4F4F"),
  "gray-main-3": colorsTuple("#828282"),
  "gray-main-4": colorsTuple("#C4C4C4"),
  "gray-main-5": colorsTuple("#F3F3F3"),
  "purple-main": colorsTuple("#9B51E0"),
};

export const routes = {
  login: "login",
  products: "products",
};
