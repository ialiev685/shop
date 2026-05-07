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
  withId?: boolean;
  isAuthRoute?: boolean;
  isAdminRoute?: boolean;
  componentName: ComponentKey;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "/catalog",
    title: "Каталог",
    withId: false,
    children: [
      {
        path: "/products/:id",
        componentName: "products",
        withId: true,
        children: [
          {
            path: "/product-preview/:id",
            componentName: "productPreview",
            withId: true,
          },
        ],
      },
    ],
    componentName: "catalog",
  },
  {
    path: "/basket",
    title: "Корзина",
    componentName: "basket",
    withId: false,
  },

  {
    path: "/login",
    componentName: "login",
    isAuthRoute: true,
  },
  {
    path: "/register",
    componentName: "register",
    isAuthRoute: true,
  },
  {
    path: "/forgot-password",
    componentName: "forgotPassword",
    isAuthRoute: true,
  },
  {
    path: "/reset-password/:token",
    componentName: "resetPassword",
    isAuthRoute: true,
  },
  {
    path: "/admin",
    componentName: "admin",
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
