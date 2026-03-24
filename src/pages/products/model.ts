import { requestApi } from "@/services/client";
import type { Product } from "@/services/products-api";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useController = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  const addProductMutation = useMutation({
    mutationFn: (id: number) =>
      new Promise((resolve) => setTimeout(resolve, 1000)),
    // onMutate: (newProduct) => {
    //   const previousProducts = queryClient.getQueryData(["products"]);

    //   queryClient.setQueryData(queryKey, (old: Product[] | undefined) => {
    //     const tempProduct = { ...newProduct, id: `temp-${Date.now()}` };
    //     return [tempProduct, ...(old || [])];
    //   });

    //   notifications.show({
    //     title: "Добавление",
    //     message: "Продукт добавляется...",
    //     loading: true,
    //     autoClose: false,
    //     id: "add-product",
    //   });

    //   return { previousProducts };
    // },

    onSuccess: () => {
      notifications.update({
        title: "Успешно",
        message: "Продукт добавлен",
        color: "green",
      });
    },
  });

  return {
    data: productsQuery.data,
    isLoading: productsQuery.isLoading,
  };
};
