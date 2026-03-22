import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";

export const useController = () => {
  const signInMutation = useQuery({
    queryKey: ["products"],
    queryFn: () => requestApi.getAllProducts({ limit: 10 }),
  });

  return { data: signInMutation.data };
};
