import { Admin } from "@/pages/admin/ui";
import { Basket } from "@/pages/basket/ui";
import { Catalog } from "@/pages/catalog/ui";
import { ForgotPassword } from "@/pages/forgot-password/ui";
import { Login } from "@/pages/login/ui";
import { ProductPreview } from "@/pages/product-preview/ui";
import { Products } from "@/pages/products";
import { Register } from "@/pages/register/ui";
import { ResetPassword } from "@/pages/reset-password/ui";
import type { ComponentType } from "react";

type RoutePath =
  | "/register"
  | "/login"
  | "/forgot-password"
  | "/catalog"
  | "/products/:id"
  | "/basket"
  | "/product-preview/:id"
  | "/reset-password/:token"
  | "/admin"
  | "*";

export type ComponentKey =
  | "catalog"
  | "products"
  | "basket"
  | "productPreview"
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword"
  | "admin";

export type Route = {
  path: RoutePath;
  title?: string;
  isAuthRoute?: boolean;
  isAdminRoute?: boolean;
  component: ComponentType;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "/catalog",
    title: "Каталог",
    component: Catalog,
    children: [
      {
        path: "/products/:id",
        component: Products,
        children: [
          {
            path: "/product-preview/:id",
            component: ProductPreview,
          },
        ],
      },
    ],
  },
  {
    path: "/basket",
    title: "Корзина",
    component: Basket,
  },
  {
    path: "/login",
    component: Login,
    isAuthRoute: true,
  },
  {
    path: "/register",
    component: Register,
    isAuthRoute: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    isAuthRoute: true,
  },
  {
    path: "/reset-password/:token",
    component: ResetPassword,
    isAuthRoute: true,
  },
  {
    path: "/admin",
    component: Admin,
    isAdminRoute: true,
  },
] as const;

const createFlatRoutes = <T extends Route[]>(routes: T) => {
  return routes.reduce(
    (acc, route) => {
      acc[route.path] = route.path;
      if (route.children) {
        const childRoutes = createFlatRoutes(route.children);
        acc = { ...acc, ...childRoutes };
      }
      return acc;
    },
    {} as Record<RoutePath, string>,
  );
};

export const routesMap = createFlatRoutes(routes);
