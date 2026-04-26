type RoutePath = "catalog" | "catalog/:typeId" | "basket" | "*";
export type ComponentKey = "catalog" | "products" | "basket";

export type Route = {
  path: RoutePath;
  title?: string;
  dynamicTitle: boolean;
  componentName: ComponentKey;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "catalog",
    title: "Каталог",
    dynamicTitle: false,
    children: [
      {
        path: "catalog/:typeId",
        componentName: "products",
        dynamicTitle: true,
      },
    ],
    componentName: "catalog",
  },
  {
    path: "basket",
    title: "Корзина",
    componentName: "basket",
    dynamicTitle: false,
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
