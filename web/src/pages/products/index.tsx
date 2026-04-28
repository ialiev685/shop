import { ProductCard } from "@/entities/product-card/ui";
import { routesMap } from "@/shared/routes";
import { Flex, SimpleGrid, Title } from "@mantine/core";
import { generatePath, useNavigate } from "react-router-dom";

// MOCK
const foodProducts = [
  {
    id: 1,
    name: "Яблоко Гренни Смит",
    price: 89.99,
    rating: 4.5,
    typeId: 101,
    img: "https://placehold.co/600x400/4CAF50/white?text=🍎+Яблоко",
    sku: "FRUIT-APPLE-001",
  },
  {
    id: 2,
    name: "Хлеб бородинский",
    price: 59.9,
    rating: 4.8,
    typeId: 102,
    img: "https://placehold.co/600x400/FF9800/white?text=🍞+Хлеб",
    sku: "BAKERY-BREAD-042",
  },
  {
    id: 3,
    name: "Молоко 3.2%",
    price: 79.5,
    rating: 4.2,
    typeId: 103,
    img: "https://placehold.co/600x400/2196F3/white?text=🥛+Молоко",
    sku: "DAIRY-MILK-089",
  },
  {
    id: 4,
    name: "Сыр Российский 50%",
    price: 349.9,
    rating: 4.9,
    typeId: 103,
    img: "https://placehold.co/600x400/FFC107/white?text=🧀+Сыр",
    sku: "DAIRY-CHEESE-156",
  },
  {
    id: 5,
    name: "Куриное филе охлажденное",
    price: 279.99,
    rating: 4.6,
    typeId: 104,
    img: "https://placehold.co/600x400/795548/white?text=🍗+Курица",
    sku: "MEAT-CHICKEN-234",
  },
  {
    id: 6,
    name: "Гречка ядрица",
    price: 89.9,
    rating: 4.7,
    typeId: 105,
    img: "https://placehold.co/600x400/8D6E63/white?text=🌾+Гречка",
    sku: "GROCERY-BUCKW-567",
  },
  {
    id: 7,
    name: "Помидоры черри",
    price: 199.0,
    rating: 4.4,
    typeId: 101,
    img: "https://placehold.co/600x400/F44336/white?text=🍅+Помидоры",
    sku: "VEGETABLE-TOMATO-789",
  },
  {
    id: 8,
    name: "Масло сливочное 82.5%",
    price: 129.99,
    rating: 4.8,
    typeId: 103,
    img: "https://placehold.co/600x400/FFC107/white?text=🧈+Масло",
    sku: "DAIRY-BUTTER-321",
  },
  {
    id: 9,
    name: "Йогурт питьевой клубничный",
    price: 45.5,
    rating: 4.3,
    typeId: 103,
    img: "https://placehold.co/600x400/E91E63/white?text=🥛+Йогурт",
    sku: "DAIRY-YOGURT-654",
  },
  {
    id: 10,
    name: "Печенье овсяное",
    price: 67.9,
    rating: 4.5,
    typeId: 106,
    img: "https://placehold.co/600x400/D2691E/white?text=🍪+Печенье",
    sku: "BAKERY-COOKIE-987",
  },
];

export const Products = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Типы
      </Title>

      <SimpleGrid cols={2} spacing={16} verticalSpacing={16}>
        {foodProducts.map((product) => (
          <ProductCard
            {...product}
            onPreview={() => {
              navigate(
                generatePath(routesMap["/product-preview/:id"], {
                  id: product.id.toString(),
                }),
              );
            }}
            onAddToBasket={() => {
              // Implementation for adding to basket
            }}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
