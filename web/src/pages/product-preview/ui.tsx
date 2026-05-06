import PreviewCard from "@/entities/preview-card";
import { productQueries } from "@/entities/product";
import { Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
  const { productId } = useParams<string>();

  const { data } = useQuery({
    ...productQueries.getById(Number(productId)),
    enabled: Boolean(productId),
  });
  if (!data) {
    return null;
  }

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Предпросмотр товара
      </Title>
      <PreviewCard {...data} onAddToBasket={() => {}} />
    </Flex>
  );
};
