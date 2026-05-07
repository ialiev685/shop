import type {
  DeleteOptions,
  UpdateQuantityOptions,
} from "@/entities/basket-card/types";
import { BasketCard } from "@/entities/basket-card/ui";
import { basketProductsQueries } from "@/entities/basket-products";
import { productQueries } from "@/entities/product";
import type { V1RemoveProductFromBasketCreatePayload } from "@/services/data-contracts";
import { Flex, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Text } from "@mantine/core";

export const Basket = () => {
  const { data } = useQuery(basketProductsQueries.get);
  const queryClient = useQueryClient();

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

  const handleDeleteQuantity = async ({
    productId,
    basketId,
    name,
  }: DeleteOptions) => {
    modals.openConfirmModal({
      modalId: `delete-product-${productId}`,
      centered: true,
      title: "Удаление товара",
      children: (
        <Text size="sm">
          Вы уверены, что хотите удалить "{name}" из корзины?
        </Text>
      ),
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { bg: "red", bd: "1px solid red" },
      closeOnConfirm: false,
      onConfirm: async () => {
        await deleteMutation.mutateAsync({
          productId,
          basketId,
        });
        modals.close(`delete-product-${productId}`);
      },
    });
  };

  const handleUpdateQuantity = async ({
    productId,
    quantity,
    basketId,
  }: UpdateQuantityOptions) => {
    await updateQuantityMutation.mutateAsync({
      productId,
      quantity,
      basketId,
    });
  };

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Корзина
      </Title>

      {data?.basketProducts.map((basketProduct) => (
        <BasketCard
          key={basketProduct.id}
          basketProduct={basketProduct}
          onUpdateQuantity={handleUpdateQuantity}
          onDelete={handleDeleteQuantity}
        />
      ))}
    </Flex>
  );
};
