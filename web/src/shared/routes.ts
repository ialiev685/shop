type RoutePath =
  | "/register"
  | "/login"
  | "/forgot-password"
  | "/catalog"
  | "/catalog/:typeId"
  | "/basket"
  | "/product-preview/:id"
  | "/reset-password/:token"
  | "*";

export type ComponentKey =
  | "catalog"
  | "products"
  | "basket"
  | "productPreview"
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword";

export type Route = {
  path: RoutePath;
  title?: string;
  withId?: boolean;
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
        path: "/catalog/:typeId",
        componentName: "products",
        withId: true,
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
    path: "/product-preview/:id",
    componentName: "productPreview",
    withId: true,
  },
  {
    path: "/login",
    componentName: "login",
  },
  {
    path: "/register",
    componentName: "register",
  },
  {
    path: "/forgot-password",
    componentName: "forgotPassword",
  },
  {
    path: "/reset-password/:token",
    componentName: "resetPassword",
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
