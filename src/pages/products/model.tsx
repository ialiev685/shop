import { requestApi } from "@/services/client";
import type { ProductsResponse } from "@/services/products-api";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
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

  const queryKey = ["products", currentSearch, skip, limit, sortBy, order];

  const productsQuery = useQuery({
    queryKey,
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
    mutationFn: requestApi.addProduct,

    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKey,
        (oldData: ProductsResponse): ProductsResponse => {
          return { ...oldData, products: [data, ...(oldData.products ?? [])] };
        },
      );
      notifications.show({
        icon: <IconCheck />,
        title: "Успешно",
        message: "Продукт добавлен",
        color: "green",
        position: "top-center",
      });
    },
  });

  return {
    data: productsQuery.data,
    isLoading: productsQuery.isLoading || addProductMutation.isPending,
    onAdd: addProductMutation.mutateAsync,
  };
};
