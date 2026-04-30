import { AuthFrom } from "@/entities/auth-form/ui";
import { userQueries } from "@/entities/user/api/user-queries";
import type { LoginCreatePayload } from "@/services/data-contracts";
import { login } from "@/services/requests/auth";
import { TOKEN_KEY } from "@/shared/configs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Login = () => {
  const loginMutation = useMutation({
    mutationFn: login,
  });
  const queryClient = useQueryClient();

  const handleSubmit = async (params: LoginCreatePayload) => {
    await loginMutation.mutateAsync(params, {
      onSuccess: (data) => {
        if (data.accessToken) {
          localStorage.setItem(TOKEN_KEY, data.accessToken);
          queryClient.setQueryData(userQueries.currentUser, data);
        }
      },
    });
  };
  return (
    <AuthFrom
      isLoading={loginMutation.isPending}
      type="login"
      onSubmit={handleSubmit}
    />
  );
};
