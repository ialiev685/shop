import { useEffect, type PropsWithChildren } from "react";
import { AuthContext } from "./context";
import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, error, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => requestApi.getUser(),
    staleTime: 0,
  });

  useEffect(() => {
    if (isError) {
      notifications.show({
        icon: <IconX />,
        title: "Ошибка",
        message: error.message,
        color: "red",
        position: "top-center",
      });
    }
  }, [error, isError]);

  console.log("data", error);

  return (
    <AuthContext.Provider value={{ user: data }}>
      {children}
    </AuthContext.Provider>
  );
};
