import {
  productListAll,
  productListByType,
  addProduct,
} from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const PRIMARY_KEY = "productList";

const productKeys = {
  productListAllKey: [PRIMARY_KEY],
  productListByTypeKey: (typeId: number) => [PRIMARY_KEY, typeId],
};

export const productQueries = {
  ...productKeys,
  getByType: (typeId: number) =>
    queryOptions({
      queryKey: productKeys.productListByTypeKey(typeId),
      queryFn: () => productListByType({ typeId }),
    }),

  getAll: queryOptions({
    queryKey: productKeys.productListAllKey,
    queryFn: () => productListAll(),
  }),
  add: mutationOptions({
    mutationFn: addProduct,
  }),
};
