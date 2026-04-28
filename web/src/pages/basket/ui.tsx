import { BasketCard } from "@/entities/basket-card/ui";
import { Flex, Title } from "@mantine/core";

const basketItems = [
  {
    id: 1,
    basketId: 101,
    productId: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "Яблоко Гренни Смит",
      price: 89.99,
      rating: 4.5,
      typeId: 101,
      img: "https://placehold.co/600x400/4CAF50/white?text=🍎+Яблоко",
      sku: "FRUIT-APPLE-001",
    },
  },
  {
    id: 2,
    basketId: 101,
    productId: 2,
    quantity: 1,
    product: {
      id: 2,
      name: "Хлеб бородинский",
      price: 59.9,
      rating: 4.8,
      typeId: 102,
      img: "https://placehold.co/600x400/FF9800/white?text=🍞+Хлеб",
      sku: "BAKERY-BREAD-042",
    },
  },
  {
    id: 3,
    basketId: 101,
    productId: 3,
    quantity: 3,
    product: {
      id: 3,
      name: "Молоко 3.2%",
      price: 79.5,
      rating: 4.2,
      typeId: 103,
      img: "https://placehold.co/600x400/2196F3/white?text=🥛+Молоко",
      sku: "DAIRY-MILK-089",
    },
  },
  {
    id: 4,
    basketId: 101,
    productId: 4,
    quantity: 1,
    product: {
      id: 4,
      name: "Сыр Российский 50%",
      price: 349.9,
      rating: 4.9,
      typeId: 103,
      img: "https://placehold.co/600x400/FFC107/white?text=🧀+Сыр",
      sku: "DAIRY-CHEESE-156",
    },
  },
  {
    id: 5,
    basketId: 101,
    productId: 5,
    quantity: 2,
    product: {
      id: 5,
      name: "Куриное филе охлажденное",
      price: 279.99,
      rating: 4.6,
      typeId: 104,
      img: "https://placehold.co/600x400/795548/white?text=🍗+Курица",
      sku: "MEAT-CHICKEN-234",
    },
  },
];

export const Basket = () => {
  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Корзина
      </Title>

      {basketItems.map((item) => (
        <BasketCard key={item.id} {...item} />
      ))}
    </Flex>
  );
};
