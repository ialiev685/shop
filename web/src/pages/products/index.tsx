import { productQueries } from "@/entities/product";
import { ProductCard } from "@/entities/product-card/ui";
import { routesMap } from "@/shared/routes";
import { Flex, SimpleGrid, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { generatePath, useNavigate, useParams } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const { typeId } = useParams<string>();

  const productsQuery = useQuery({
    ...productQueries.getByType(Number(typeId)),
    enabled: Boolean(typeId),
  });

  const products = productsQuery.data?.data ?? [];

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Типы
      </Title>

      <SimpleGrid cols={2} spacing={16} verticalSpacing={16}>
        {products.map((product) => (
          <ProductCard
            {...product}
            onPreview={() => {
              navigate(
                generatePath(routesMap["/product-preview/:productId"], {
                  productId: product.id.toString(),
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
