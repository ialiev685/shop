import PreviewCard from "@/entities/preview-card";
import { productQueries } from "@/entities/product";
import { Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const ProductPreview = () => {
  const { id } = useParams<string>();

  const { data } = useQuery({
    ...productQueries.getById(Number(id)),
    enabled: Boolean(id),
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
