import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context";
import { Center, Loader } from "@mantine/core";
import { routesMap } from "@/shared/routes";

export const PublicRoute = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center bg="bg-shop-page" h="100vh">
        <Loader color="blue" />
      </Center>
    );
  }

  if (isAuthorized) {
    return <Navigate to={routesMap["/catalog"]} />;
  }

  return (
    <Center bg="bg-shop-page" h="100vh">
      <Outlet />;
    </Center>
  );
};
