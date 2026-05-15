import { ProductCard } from "@/entities/product/ui/product-card";
import { Box, Flex, Loader, SimpleGrid, Title } from "@mantine/core";
import { AddProductToBasketControl } from "@/features/add-product--to-basket-control/ui";
import { useController } from "./model";

export const Products = () => {
  const {
    title,
    products,
    handlePreview,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
  } = useController();
  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        {title}
      </Title>

      <SimpleGrid cols={2} spacing={16} verticalSpacing={16}>
        {products.map((product) => (
          <ProductCard
            product={product}
            onPreview={handlePreview}
            control={<AddProductToBasketControl productId={product.id} />}
          />
        ))}
      </SimpleGrid>

      {(hasNextPage || isFetchingNextPage) && (
        <Box ref={loadMoreRef} ta="center" py="md">
          <Loader size="sm" />
        </Box>
      )}
    </Flex>
  );
};
