import { PreviewCard } from "@/entities/product/ui/preview-card";
import { AddProductToBasketControl } from "@/features/add-product--to-basket-control/ui";
import { Flex, Title } from "@mantine/core";
import { IconBasket } from "@tabler/icons-react";
import { useController } from "./model";

export const ProductPreview = () => {
  const { product, productInfo, title } = useController();

  if (!product) {
    return null;
  }

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        {title}
      </Title>
      <PreviewCard
        productInfo={productInfo}
        {...product}
        control={
          <AddProductToBasketControl
            productId={product.id}
            leftSection={<IconBasket cursor="pointer" />}
            variant="filled-accent-shop"
          />
        }
      />
    </Flex>
  );
};
