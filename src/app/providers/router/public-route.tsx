import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context";
import { Loader } from "@mantine/core";
import { routes } from "@/shared/configs";

export const PublicRoute = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="blue" />;
  }

  if (isAuthorized) {
    return <Navigate to={routes.products} />;
  }

  return <Outlet />;
};
