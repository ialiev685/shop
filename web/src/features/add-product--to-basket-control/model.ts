import { basketProductsQueries } from "@/entities/basket-products";
import { productQueries } from "@/entities/product";
import type {
  V1BasketListListData,
  V1UpdateQuantityProductCreatePayload,
} from "@/services/data-contracts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findProductInBasket } from "./lib";

export const useController = ({ productId }: { productId: number }) => {
  const queryClient = useQueryClient();

  const basketProductsQuery = useQuery(basketProductsQueries.get);

  const addProductToBasketMutation = useMutation({
    ...basketProductsQueries.add,
    onSuccess: (data) => {
      queryClient.setQueryData(
        basketProductsQueries.basketProductsListKey,
        (oldData: V1BasketListListData): V1BasketListListData => {
          return {
            ...oldData,
            basketProducts: [...oldData.basketProducts, data],
          };
        },
      );
    },
  });

  const updateQuantityMutation = useMutation({
    ...basketProductsQueries.updateQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: basketProductsQueries.basketProductsListKey,
      });
      queryClient.invalidateQueries({
        queryKey: productQueries.primaryKey,
      });
    },
  });

  const deleteMutation = useMutation({
    ...basketProductsQueries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: basketProductsQueries.basketProductsListKey,
      });
      queryClient.invalidateQueries({
        queryKey: productQueries.primaryKey,
      });
    },
  });

  const handleAddToBasket = async (id: number) => {
    await addProductToBasketMutation.mutateAsync({ productId: id });
  };

  const handleUpdateQuantity = async ({
    productId,
    quantity,
    basketId,
  }: V1UpdateQuantityProductCreatePayload) => {
    await updateQuantityMutation.mutateAsync({
      productId,
      quantity,
      basketId,
    });
  };

  const handleDeleteProductFromBasket = async (
    productId: number,
    basketId: number,
  ) => {
    await deleteMutation.mutateAsync({ productId, basketId });
  };

  const foundProductInBasket = findProductInBasket(
    productId,
    basketProductsQuery.data?.basketProducts ?? [],
  );

  const isLoading =
    basketProductsQuery.isLoading ||
    addProductToBasketMutation.isPending ||
    updateQuantityMutation.isPending ||
    deleteMutation.isPending;

  return {
    basketProducts: basketProductsQuery.data?.basketProducts ?? [],
    foundProductInBasket,
    isLoading,
    handleAddToBasket,
    handleUpdateQuantity,
    handleDeleteProductFromBasket,
  };
};
