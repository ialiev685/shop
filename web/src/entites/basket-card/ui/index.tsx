import { Card, Flex, Grid, Group, Image, Paper, Text } from "@mantine/core";
import { Counter } from "./counter";
import { IconTrash } from "@tabler/icons-react";

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
        <Group gap={8}>
          <Paper shadow="sm" radius={4}>
            <Image fit="cover" src={product.img} h={80} />
          </Paper>
          <Flex
            p="8px 8px 0 8px"
            flex="2"
            h={80}
            w="100%"
            direction="column"
            justify="space-between"
          >
            <Grid gutter={0}>
              <Grid.Col span="auto">
                <Text c="gray-shop-1" fz={12} lineClamp={3}>
                  {product.name}
                </Text>
              </Grid.Col>
              <Grid.Col span="content">
                <IconTrash size={20} />
              </Grid.Col>
            </Grid>

            <Group align="flex-start" gap={8}>
              <Text c="gray-shop-1" fz={12} fw={700}>
                {product.price} ₽
              </Text>
              <Text fz={8} c="gray-shop-2">
                за штуку
              </Text>
            </Group>
          </Flex>
        </Group>
      </Card.Section>

      <Group mt={12} justify="space-between" align="center">
        <Counter quantity={quantity} />
        <Text c="gray-shop-1" fw={700}>
          {product.price * quantity} ₽
        </Text>
      </Group>
    </Card>
  );
};
