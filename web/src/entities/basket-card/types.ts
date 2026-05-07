import type { V1RemoveProductFromBasketCreatePayload } from "@/services/data-contracts";

export type UpdateQuantityOptions = {
  productId: number;
  quantity: number;
  basketId: number;
};

export type DeleteOptions = V1RemoveProductFromBasketCreatePayload & {
  name: string;
};
