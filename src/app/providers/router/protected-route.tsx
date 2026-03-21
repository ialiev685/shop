import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context";
import { routes } from "@/shared/configs";
import { Loader } from "@mantine/core";

export const ProtectedRoute = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="blue" />;
  }

  if (!isAuthorized) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
};
