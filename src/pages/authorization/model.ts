import { requestApi, type LoginData } from "@/services/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useController = () => {
  const signInMutation = useMutation({
    mutationFn: requestApi.signIn,
  });
  const queryClient = useQueryClient();
  const handleSignIn = async (params: LoginData) => {
    signInMutation.mutateAsync(params, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });
  };
  return { handleSignIn };
};
