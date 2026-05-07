import { BasketCard } from "@/entities/basket-card/ui";
import { basketProductsQueries } from "@/entities/basket-products";
import { Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export const Basket = () => {
  const { data } = useQuery(basketProductsQueries.get);

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Корзина
      </Title>

      {data?.basketProducts.map((basketProduct) => (
        <BasketCard key={basketProduct.id} basketProduct={basketProduct} />
      ))}
    </Flex>
  );
};
