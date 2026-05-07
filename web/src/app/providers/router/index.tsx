import { Routes, Route, Navigate } from "react-router-dom";

import { Main } from "@/pages/main/ui";

import { routes, routesMap, type Route as RouteType } from "@/app/routes";
import { PublicRoute } from "./public-route";
import { AdminRoute } from "./amin-route";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        {createRoutes(routes.filter(({ isAdminRoute }) => isAdminRoute))}
      </Route>
      <Route element={<PublicRoute />}>
        {createRoutes(routes.filter(({ isAuthRoute }) => isAuthRoute))}
      </Route>
      <Route element={<Main />}>
        {createRoutes(routes.filter(({ isAuthRoute }) => !isAuthRoute))}
        <Route
          path="*"
          element={<Navigate to={routesMap["/catalog"]} replace />}
        />
      </Route>
    </Routes>
  );
};

const createRoutes = (routes: RouteType[]): React.ReactNode[] => {
  return routes.reduce<React.ReactNode[]>((acc, item) => {
    const Page = item.component;
    acc.push(<Route key={item.path} path={item.path} element={<Page />} />);
    if (item.children) {
      const childRoutes = createRoutes(item.children);
      acc.push(...childRoutes);
    }
    return acc;
  }, []);
};
