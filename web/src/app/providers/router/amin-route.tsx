import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context";

import { Box, Center, Loader } from "@mantine/core";
import { routesMap } from "@/app/routes";

export const AdminRoute = () => {
  const { isAuthorized, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader color="blue" />
      </Center>
    );
  }

  if (!isAuthorized) {
    return <Navigate to={routesMap["/login"]} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to={routesMap["/catalog"]} replace />;
  }

  return (
    <Box bg="gray-main-5" h="100%" pt={20}>
      <Outlet />
    </Box>
  );
};
