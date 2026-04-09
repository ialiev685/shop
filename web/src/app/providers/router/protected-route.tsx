import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/context";
import { routes } from "@/shared/configs";
import { Box, Center, Loader } from "@mantine/core";

export const ProtectedRoute = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader color="blue" />
      </Center>
    );
  }

  if (!isAuthorized) {
    return <Navigate to={routes.login} replace />;
  }

  return (
    <Box bg="gray-main-5" h="100%" pt={20}>
      <Outlet />
    </Box>
  );
};
