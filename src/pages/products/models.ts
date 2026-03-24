import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useController = () => {
  const [searchParams] = useSearchParams();

  const skip = Number(searchParams.get("skip") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 10);

  const signInMutation = useQuery({
    queryKey: ["products", skip, limit],
    queryFn: () => requestApi.getAllProducts({ limit, skip }),
  });

  return { data: signInMutation.data };
};
