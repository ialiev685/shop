import type { V1ProductListByTypeDetailData } from "@/services/data-contracts";
import { Card, Image, Text, Rating, Flex, Button } from "@mantine/core";

type ProductCardProps = {
  product: V1ProductListByTypeDetailData["data"][number];
  onPreview: (id: number, name: string) => void;
  onAddToBasket: (id: number) => void;
};

export const ProductCard = ({
  product,
  onPreview,
  onAddToBasket,
}: ProductCardProps) => {
  return (
    <Card shadow="sm" onClick={() => onPreview(product.id, product.name)}>
      <Card.Section>
        <Image h={160} src={product.img} fit="cover" />
      </Card.Section>
      <Flex direction="column" justify="space-between" h="100%" gap={8}>
        <Text c="gray-shop-1" fw={700} fz={18}>
          {product.price.toFixed(2)}
        </Text>
        <Text c="gray-shop-1">{product.name}</Text>
        <Rating value={product.rating} c="accent-shop-1" readOnly />
        <Button
          variant="outline-green-shop"
          onClick={(event) => {
            event.stopPropagation();
            onAddToBasket(product.id);
          }}
        >
          В корзину
        </Button>
      </Flex>
    </Card>
  );
};
