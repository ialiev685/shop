import { productList, addProduct } from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const productKeys = {
  productListKey: (typeId: number) => ["productList", typeId],
};

export const productQueries = {
  ...productKeys,
  get: (typeId: number) =>
    queryOptions({
      queryKey: productKeys.productListKey(typeId),
      queryFn: () => productList({ typeId }),
    }),
  add: mutationOptions({
    mutationFn: addProduct,
  }),
};
