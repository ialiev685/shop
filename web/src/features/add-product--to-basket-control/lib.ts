import type { V1BasketListListData } from "@/services/data-contracts";

export const findProductInBasket = (
  productId: number,
  basketProducts: V1BasketListListData["basketProducts"],
) => {
  return basketProducts.find(
    (basketProduct) => basketProduct.productId === productId,
  );
};
