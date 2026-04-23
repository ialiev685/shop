import { Box, Card, Flex, Group, Image, Paper, Text } from "@mantine/core";
import { Counter } from "./counter";

type BasketCardProps = {
  id: number;
  basketId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    img: string;
    sku: string;
  };
};

export const BasketCard = ({ product, quantity }: BasketCardProps) => {
  return (
    <Card shadow="sm">
      <Card.Section>
        <Group gap={12}>
          <Paper shadow="sm" radius={4}>
            <Image fit="contain" src={product.img} h={78} />
          </Paper>
          <Box p={8}>
            <Text c="gray-shop-1" fz={12}>
              {product.name}
            </Text>

            <Group mt={8} align="flex-start" gap={8}>
              <Text c="gray-shop-1" fz={12} fw={700}>
                {product.price} ₽
              </Text>
              <Text fz={8} c="gray-shop-2">
                за штуку
              </Text>
            </Group>
          </Box>
        </Group>
      </Card.Section>

      <Flex mt={12} justify="space-between" align="center">
        <Counter quantity={quantity} />
        <Text c="gray-shop-1" fw={700}>
          {product.price * quantity} ₽
        </Text>
      </Flex>
    </Card>
  );
};
