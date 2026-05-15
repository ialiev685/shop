import type { V1AllProductListListParams } from "@/services/data-contracts";
import {
  productListAll,
  productListByType,
  addProduct,
  removeProduct,
  productById,
} from "@/services/requests/api";
import { PAGINATION } from "@/shared/configs";
import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from "@tanstack/react-query";

const PRIMARY_KEY = "productList";

const productKeys = {
  primaryKey: [PRIMARY_KEY],
  productListAllKey: (params: V1AllProductListListParams) => [
    PRIMARY_KEY,
    params,
  ],
  productListByTypeKey: (typeId: number) => [PRIMARY_KEY, typeId],
  productByIdKey: (productId: number) => [PRIMARY_KEY, productId],
};

export const productQueries = {
  ...productKeys,
  getByType: (typeId: number) =>
    queryOptions({
      queryKey: productKeys.productListByTypeKey(typeId),
      queryFn: () => productListByType({ typeId }),
    }),

  getByTypeInfinity: (typeId: number) =>
    infiniteQueryOptions({
      queryKey: productKeys.productListByTypeKey(typeId),
      queryFn: ({ queryKey, pageParam }) => {
        const [_, catalogId] = queryKey;
        if (typeof catalogId === "number") {
          return productListByType({
            typeId: catalogId,
            page: pageParam,
            limit: PAGINATION.LIMIT,
          });
        }
        return Promise.reject(
          "Ошибка при получении параметров из конфигурации getByTypeInfinity",
        );
      },
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.hasNextPage
          ? lastPage.pagination.page + 1
          : undefined;
      },
      initialPageParam: 1,
    }),
  getAll: (params: V1AllProductListListParams) =>
    queryOptions({
      queryKey: productKeys.productListAllKey(params),
      queryFn: () => productListAll(params),
    }),
  getAllInfinity: (params: V1AllProductListListParams) =>
    infiniteQueryOptions({
      queryKey: productKeys.productListAllKey(params),
      queryFn: ({ queryKey, pageParam }) => {
        const [_, params] = queryKey;
        if (typeof params !== "string") {
          return productListAll({
            ...params,
            page: pageParam,
            limit: PAGINATION.LIMIT,
          });
        }
        return Promise.reject(
          "Ошибка при получении параметров из конфигурации getAllInfinity",
        );
      },
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.hasNextPage
          ? lastPage.pagination.page + 1
          : undefined;
      },
      initialPageParam: 1,
    }),
  getById: (productId: number) =>
    queryOptions({
      queryKey: productKeys.productByIdKey(productId),
      queryFn: () => productById({ productId }),
    }),
  add: mutationOptions({
    mutationFn: addProduct,
  }),
  delete: mutationOptions({
    mutationFn: removeProduct,
  }),
};
