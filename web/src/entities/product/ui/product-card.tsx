import type { V1ProductListByTypeDetailData } from "@/services/data-contracts";
import { Card, Image, Text, Rating, Flex } from "@mantine/core";
import type { ReactNode } from "react";

type ProductCardProps = {
  product: V1ProductListByTypeDetailData["data"][number];
  onPreview: (id: number, name: string) => void;
  control?: ReactNode;
};

export const ProductCard = ({
  product,
  onPreview,
  control,
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
        {control}
      </Flex>
    </Card>
  );
};
