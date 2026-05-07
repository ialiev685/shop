import { useMantineTheme, Text } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParamsState } from "@/shared/hooks/use-search-params-state";
import type { V1AllProductListListParams } from "@/services/data-contracts";
import { PAGINATION } from "@/shared/configs";
import { TABS_VALUE } from "./configs";
import { modals } from "@mantine/modals";
import { productQueries } from "@/entities/product";
import { typeQueries } from "@/entities/catalog";

export const useController = () => {
  const { setParam, getParam } = useSearchParamsState();
  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  const searchParams = {
    search: getParam("search") || "",
    page: Number(getParam("page")) || PAGINATION.PAGE,
    limit: Number(getParam("limit")) || PAGINATION.LIMIT,
    sortBy: getParam("sortBy") || "name",
    sortOrder: (
      getParam("order") || "asc"
    ).toUpperCase() as V1AllProductListListParams["sortOrder"],
  };

  const productListQuery = useQuery({
    ...productQueries.getAll(searchParams),
    enabled: getParam("tab") === TABS_VALUE.products,
  });

  const typeListQuery = useQuery({
    ...typeQueries.get({ search: getParam("search") || "" }),
    enabled: getParam("tab") === TABS_VALUE.types,
  });

  const removeType = useMutation({
    ...typeQueries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typeList"] });
    },
  });

  const removeProduct = useMutation({
    ...productQueries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productList", searchParams],
      });
    },
  });

  const handleRemoveType = async (typeId: number) => {
    const modalId = `delete-type-${typeId}`;
    modals.openConfirmModal({
      modalId,
      centered: true,
      closeOnConfirm: false,
      title: "Удаление типа",
      children: <Text size="sm">Вы уверены, что хотите удалить тип?</Text>,
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { bg: "red", bd: "1px solid red" },
      onConfirm: async () => {
        await removeType.mutateAsync({ typeId });
        modals.close(modalId);
      },
    });
  };

  const handleRemoveProduct = async (productId: number) => {
    const modalId = `delete-product-${productId}`;
    modals.openConfirmModal({
      modalId,
      centered: true,
      closeOnConfirm: false,
      title: "Удаление товара",
      children: <Text size="sm">Вы уверены, что хотите удалить продукт?</Text>,
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { bg: "red", bd: "1px solid red" },
      onConfirm: async () => {
        await removeProduct.mutateAsync({ productId });
        modals.close(modalId);
      },
    });
  };

  return {
    productList: productListQuery.data,
    typeList: typeListQuery.data,
    isLoading: productListQuery.isLoading || typeListQuery.isLoading,
    handleRemoveType,
    handleRemoveProduct,
    theme,
    queryClient,
    setParam,
    getParam,
  };
};
