import PreviewCard from "@/entites/preview-card";
import { Flex, Title } from "@mantine/core";

// MOCK
const product = {
  id: 1,
  name: "Яблоко Гренни Смит",
  price: 89.99,
  rating: 4.5,
  typeId: 101,
  img: "https://placehold.co/600x400/4CAF50/white?text=🍎+Яблоко",
  sku: "FRUIT-APPLE-001",
};

export const ProductPreview = () => {
  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Предпросмотр товара
      </Title>
      <PreviewCard {...product} onAddToBasket={() => {}} />
    </Flex>
  );
};
