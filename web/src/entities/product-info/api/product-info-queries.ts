import type { V1AllProductInfoListListParams } from "@/services/data-contracts";
import {
  addProductInfo,
  deleteProductInfo,
  productInfoListAll,
  productInfoListById,
} from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const PRIMARY_KEY = "productInfoList";

const productInfoKeys = {
  primaryKey: [PRIMARY_KEY],
  productInfoListKey: (params: V1AllProductInfoListListParams) => [
    PRIMARY_KEY,
    params,
  ],
  productInfoListByIdKey: (productId: number) => [PRIMARY_KEY, productId],
};

export const productInfoQueries = {
  ...productInfoKeys,
  add: mutationOptions({
    mutationFn: addProductInfo,
  }),
  delete: mutationOptions({
    mutationFn: deleteProductInfo,
  }),
  getAll: (params: V1AllProductInfoListListParams) =>
    queryOptions({
      queryKey: productInfoKeys.productInfoListKey(params),
      queryFn: () => productInfoListAll(params),
    }),
  getById: (productId: number) =>
    queryOptions({
      queryKey: productInfoKeys.productInfoListByIdKey(productId),
      queryFn: () => productInfoListById({ productId }),
    }),
};
