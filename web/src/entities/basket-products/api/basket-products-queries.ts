import {
  addProductToBasket,
  basketProductList,
  deleteProductFromBasket,
  updateQuantityProductFromBasket,
} from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const basketProductsKeys = {
  basketProductsListKey: ["basketProductsList"],
};

export const basketProductsQueries = {
  ...basketProductsKeys,
  basketProductsListKey: ["basketProductsList"],
  get: queryOptions({
    queryFn: basketProductList,
    queryKey: basketProductsKeys.basketProductsListKey,
  }),
  add: mutationOptions({ mutationFn: addProductToBasket }),
  updateQuantity: mutationOptions({
    mutationFn: updateQuantityProductFromBasket,
  }),
  delete: mutationOptions({ mutationFn: deleteProductFromBasket }),
};
