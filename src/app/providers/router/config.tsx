import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "./public-route";
import { ProtectedRoute } from "./protected-route";
import { Authorization } from "@/pages/authorization/ui";
import { routes } from "@/shared/configs";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: routes.login,
        element: <Authorization />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: routes.products,
        element: <div>products</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.login} />,
  },
]);
