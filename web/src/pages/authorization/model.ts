import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useController = () => {
  const signInMutation = useMutation({
    mutationFn: Promise.resolve,
  });
  const queryClient = useQueryClient();
  const handleSignIn = async (params) => {
    signInMutation.mutateAsync(params, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });
  };
  return { handleSignIn };
};
