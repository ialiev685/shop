import { basketProductsQueries } from "@/entities/basket-products";
import { productQueries } from "@/entities/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface DeleteOptions {
  productId: number;
  basketId: number;
}

export const useController = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(basketProductsQueries.get);

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

  const handleDeleteQuantity = async ({
    productId,
    basketId,
  }: DeleteOptions) => {
    await deleteMutation.mutateAsync({
      productId,
      basketId,
    });
  };

  return {
    data,
    handleDeleteQuantity,
    isLoading: deleteMutation.isPending,
  };
};
