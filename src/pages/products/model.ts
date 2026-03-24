import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useController = () => {
  const [searchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const skip = Number(searchParams.get("skip") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 10);
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const order = (searchParams.get("order") as "asc" | "desc") ?? undefined;

  const productsQuery = useQuery({
    queryKey: ["products", currentSearch, skip, limit, sortBy, order],
    queryFn: () =>
      currentSearch
        ? requestApi.getSearchProducts({
            limit,
            skip,
            q: currentSearch,
          })
        : requestApi.getAllProducts({ limit, skip, sortBy, order }),
  });

  return {
    data: productsQuery.data,
    isLoading: productsQuery.isLoading,
  };
};
