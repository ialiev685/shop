import { routesMap } from "@/app/routes";
import { userQueries } from "@/entities/user";
import { ResetPasswordForm } from "@/entities/user/ui/reset-password-form";
import type { ResetPasswordCreatePayload } from "@/services/data-contracts";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const resetPasswordMutation = useMutation(userQueries.resetPassword);
  const navigate = useNavigate();

  const handleSubmit = async (params: ResetPasswordCreatePayload) => {
    await resetPasswordMutation.mutateAsync(params, {
      onSuccess: () => {
        notifications.show({
          title: "Пароль изменён",
          message: "Ваш пароль успешно обновлён. Теперь вы можете войти.",
          color: "green",
          position: "top-center",
        });

        setTimeout(() => {
          navigate(routesMap["/login"]);
        }, 2000);
      },
    });
  };
  return (
    <ResetPasswordForm
      isLoading={resetPasswordMutation.isPending}
      onSubmit={handleSubmit}
    />
  );
};
