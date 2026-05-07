import type { LinkState } from "@/entities/navigation-crumbs";
import { productQueries } from "@/entities/product";
import { ProductCard } from "@/entities/product-card/ui";
import { routesMap } from "@/app/routes";
import { Flex, SimpleGrid, Title } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { basketProductsQueries } from "@/entities/basket-products";
import type { V1BasketListListData } from "@/services/data-contracts";

export const Products = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    ...productQueries.getByType(Number(id)),
    enabled: Boolean(id),
  });

  const addProductToBasketMutation = useMutation({
    ...basketProductsQueries.add,
    onSuccess: (data) => {
      queryClient.setQueryData(
        basketProductsQueries.basketProductsListKey,
        (oldData: V1BasketListListData): V1BasketListListData => {
          return {
            ...oldData,
            basketProducts: [...oldData.basketProducts, data],
          };
        },
      );
    },
  });

  const products = productsQuery.data?.data ?? [];

  const handleAddToBasket = async (id: number) => {
    await addProductToBasketMutation.mutateAsync({ productId: id });
  };
  const handlePreview = (id: number, name: string) => {
    const to = generatePath(routesMap["/product-preview/:id"], {
      id: id.toString(),
    });
    navigate(to, { state: { title: name, to } as LinkState });
  };

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Типы
      </Title>

      <SimpleGrid cols={2} spacing={16} verticalSpacing={16}>
        {products.map((product) => (
          <ProductCard
            product={product}
            onPreview={handlePreview}
            onAddToBasket={handleAddToBasket}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
