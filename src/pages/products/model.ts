import { requestApi } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useController = () => {
  const [searchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const skip = Number(searchParams.get("skip") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 10);

  const searchProductsQuery = useQuery({
    queryKey: ["searchProducts", currentSearch, skip, limit],
    queryFn: () =>
      requestApi.getSearchProducts({
        limit,
        skip,
        q: currentSearch,
      }),
  });

  const productsQuery = useQuery({
    queryKey: ["products", skip, limit],
    queryFn: () => requestApi.getAllProducts({ limit, skip }),
  });

  return {
    data: searchProductsQuery.data ?? productsQuery.data,
    isLoading: searchProductsQuery.isLoading || productsQuery.isLoading,
  };
};
