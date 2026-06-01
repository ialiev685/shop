import { routesMap } from "@/app/routes";
import { userQueries } from "@/entities/user";
import { AuthForm } from "@/entities/user/ui/auth-form";
import type { RegisterCreatePayload } from "@/services/data-contracts";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const registerMutation = useMutation(userQueries.register);
  const navigate = useNavigate();

  const handleSubmit = async (
    params: Omit<RegisterCreatePayload, "redirectUrl">,
  ) => {
    await registerMutation.mutateAsync(
      {
        ...params,
        redirectUrl: `${import.meta.env.VITE_APP_HOST}${routesMap["/login"]}`,
      },
      {
        onSuccess: (data) => {
          notifications.show({
            title: "Вы зарегестрированы",
            message: `На email ${data.email} отправлено письмо с подтверждением`,
            color: "green",
            position: "top-center",
            autoClose: 5000,
          });

          navigate(routesMap["/catalog"]);
        },
      },
    );
  };

  return (
    <AuthForm
      type="register"
      isLoading={registerMutation.isPending}
      onSubmit={handleSubmit}
    />
  );
};
