import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./public-route";
import { Authorization } from "@/pages/authorization/ui";
import { routes } from "@/shared/configs";
import { ProtectedRoute } from "./protected-route";
import { Products } from "@/pages/products/ui";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={routes.login} element={<Authorization />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={routes.products} element={<Products />} />
      </Route>

      <Route path="*" element={<Navigate to={routes.login} replace />} />
    </Routes>
  );
};
