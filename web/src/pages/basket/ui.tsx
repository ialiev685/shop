import { BasketCard } from "@/entities/basket-products/ui/basket-card";
import { AddProductToBasketControl } from "@/features/add-product--to-basket-control/ui";
import { Flex, Title } from "@mantine/core";
import { useController } from "./model";

export const Basket = () => {
  const { data, handleDeleteQuantity, isLoading } = useController();

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Корзина
      </Title>

      {data?.basketProducts.map((basketProduct) => (
        <BasketCard
          isLoading={isLoading}
          key={basketProduct.id}
          basketProduct={basketProduct}
          onDelete={handleDeleteQuantity}
          control={
            <AddProductToBasketControl productId={basketProduct.productId} />
          }
        />
      ))}
    </Flex>
  );
};
