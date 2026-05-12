import { Text } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParamsState } from "@/shared/hooks/use-search-params-state";
import type { V1AllProductListListParams } from "@/services/data-contracts";
import { PAGINATION } from "@/shared/configs";
import { TABS_VALUE } from "./configs";
import { modals } from "@mantine/modals";
import { productQueries } from "@/entities/product";
import { typeQueries } from "@/entities/catalog";
import { productInfoQueries } from "@/entities/product-info/api/product-info-queries";

export const useController = () => {
  const { setParam, getParam } = useSearchParamsState();
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

  const productInfoQuery = useQuery({
    ...productInfoQueries.getAll({
      page: searchParams.page,
      limit: searchParams.limit,
      search: searchParams.search,
    }),
    enabled: getParam("tab") === TABS_VALUE.productInfo,
  });

  const productListQuery = useQuery({
    ...productQueries.getAll(searchParams),
    enabled: getParam("tab") === TABS_VALUE.products,
  });

  const typeListQuery = useQuery({
    ...typeQueries.get({ search: searchParams.search }),
    enabled: getParam("tab") === TABS_VALUE.types,
  });

  const removeType = useMutation({
    ...typeQueries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: typeQueries.primaryKey });
    },
  });

  const removeProduct = useMutation({
    ...productQueries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueries.primaryKey,
      });
    },
  });

  const removeProductInfo = useMutation({
    ...productInfoQueries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productInfoQueries.primaryKey,
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
      title: "Удаление продукта",
      children: <Text size="sm">Вы уверены, что хотите удалить продукт?</Text>,
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { bg: "red", bd: "1px solid red" },
      onConfirm: async () => {
        await removeProduct.mutateAsync({ productId });
        modals.close(modalId);
      },
    });
  };

  const handleRemoveProductInfo = async (productInfoId: number) => {
    const modalId = `delete-product-info-${productInfoId}`;
    modals.openConfirmModal({
      modalId,
      centered: true,
      closeOnConfirm: false,
      title: "Удаление характеристики",
      children: (
        <Text size="sm">Вы уверены, что хотите удалить характеристики??</Text>
      ),
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { bg: "red", bd: "1px solid red" },
      onConfirm: async () => {
        await removeProductInfo.mutateAsync({ productInfoId });
        modals.close(modalId);
      },
    });
  };

  return {
    productList: productListQuery.data,
    productInfoList: productInfoQuery.data,
    typeList: typeListQuery.data,
    isLoading: productListQuery.isLoading || typeListQuery.isLoading,
    handleRemoveType,
    handleRemoveProduct,
    handleRemoveProductInfo,
    setParam,
    getParam,
  };
};
