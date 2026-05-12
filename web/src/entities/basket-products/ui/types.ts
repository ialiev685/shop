import type {
  V1BasketListListData,
  V1RemoveProductFromBasketCreatePayload,
} from "@/services/data-contracts";
import type { ReactNode } from "react";

export type DeleteOptions = V1RemoveProductFromBasketCreatePayload;

export type BasketCardProps = {
  basketProduct: V1BasketListListData["basketProducts"][number];
  onDelete: (options: DeleteOptions) => void;
  control?: ReactNode;
  isLoading?: boolean;
};
