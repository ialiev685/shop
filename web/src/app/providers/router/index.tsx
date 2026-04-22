import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "@/shared/configs";
import { Main } from "@/pages/main/ui";
import { Catalog } from "@/pages/catalog";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<PublicRoute />}>
        <Route path={routes.login} element={<Authorization />} />
      </Route> */}

      {/* <Route element={<ProtectedRoute />}>
        <Route path={routes.products} element={<Products />} />
      </Route> */}

      <Route path={routes.main} element={<Main />}>
        <Route path={routes.catalog} element={<Catalog />} />
      </Route>

      <Route path="*" element={<Navigate to={routes.login} replace />} />
    </Routes>
  );
};
