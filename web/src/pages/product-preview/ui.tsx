import { PreviewCard } from "@/entities/product/ui/preview-card";
import { productQueries } from "@/entities/product";
import { AddProductToBasketControl } from "@/features/add-product--to-basket-control/ui";
import { Flex, Title } from "@mantine/core";
import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productInfoQueries } from "@/entities/product-info/api/product-info-queries";

export const ProductPreview = () => {
  const { id } = useParams<string>();

  const productQuery = useQuery({
    ...productQueries.getById(Number(id)),
    enabled: Boolean(id),
  });

  const productInfoQuery = useQuery({
    ...productInfoQueries.getById(productQuery.data?.id ?? NaN),
    enabled: Boolean(productQuery.data?.id),
  });

  if (!productQuery.data) {
    return null;
  }

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Предпросмотр товара
      </Title>
      <PreviewCard
        productInfo={productInfoQuery.data}
        {...productQuery.data}
        control={
          <AddProductToBasketControl
            productId={productQuery.data.id}
            leftSection={<IconBasket cursor="pointer" />}
            variant="filled-accent-shop"
          />
        }
      />
    </Flex>
  );
};
