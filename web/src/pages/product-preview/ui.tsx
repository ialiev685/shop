import { PreviewCard } from "@/entities/preview-card/ui";
import { productQueries } from "@/entities/product";
import { AddProductToBasketControl } from "@/features/add-product--to-basket-control/ui";
import { Flex, Title } from "@mantine/core";
import { IconBasket } from "@tabler/icons-react";
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
      <PreviewCard
        {...data}
        control={
          <AddProductToBasketControl
            productId={data.id}
            leftSection={<IconBasket cursor="pointer" />}
            variant="filled-accent-shop"
          />
        }
      />
    </Flex>
  );
};
