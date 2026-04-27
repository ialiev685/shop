import { Routes, Route, Navigate } from "react-router-dom";

import { Main } from "@/pages/main/ui";
import { Basket } from "@/pages/basket/ui";

import { Catalog } from "@/pages/catalog";
import {
  routes,
  routesMap,
  type ComponentKey,
  type Route as RouteType,
} from "@/shared/routes";
import { Products } from "@/pages/products";
import { ProductPreview } from "@/pages/product-preview/ui";

const pages: Record<ComponentKey, React.ComponentType> = {
  catalog: Catalog,
  products: Products,
  basket: Basket,
  productPreview: ProductPreview,
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<PublicRoute />}>
        <Route path={routes.login} element={<Authorization />} />
      </Route> */}

      {/* <Route element={<ProtectedRoute />}>
        <Route path={routes.products} element={<Products />} />
      </Route> */}

      <Route element={<Main />}>
        {createRoutes(routes)}
        <Route path="*" element={<Navigate to={routesMap.catalog} replace />} />
      </Route>
    </Routes>
  );
};

const createRoutes = (routes: RouteType[]): React.ReactNode[] => {
  return routes.reduce<React.ReactNode[]>((acc, item) => {
    const Page = pages[item.componentName];
    acc.push(<Route key={item.path} path={item.path} element={<Page />} />);
    if (item.children) {
      const childRoutes = createRoutes(item.children);
      acc.push(...childRoutes);
    }
    return acc;
  }, []);
};
