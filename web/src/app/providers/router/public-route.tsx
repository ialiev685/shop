import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context";
import { Center, Loader } from "@mantine/core";
import { routes } from "@/shared/configs";

export const PublicRoute = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader color="blue" />
      </Center>
    );
  }

  if (isAuthorized) {
    return <Navigate to={routes.products} />;
  }

  return <Outlet />;
};
