import { routesMap } from "@/app/routes";
import { userQueries } from "@/entities/user";
import { ForgotPasswordForm } from "@/entities/user/ui/forgot-password-form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

export const ForgotPassword = () => {
  const forgotPasswordMutation = useMutation(userQueries.forgotPassword);

  const handleSubmit = async (email: string) => {
    await forgotPasswordMutation.mutateAsync(
      {
        email,
        redirectUrl: `${import.meta.env.VITE_APP_HOST}${routesMap["/reset-password/:token"]}`,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Письмо отправлено",
            message: `На данный email отправлена инструкция по восстановлению пароля`,
            color: "green",
            position: "top-center",
            autoClose: 5000,
          });
        },
      },
    );
  };
  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      isLoading={forgotPasswordMutation.isPending}
    />
  );
};
