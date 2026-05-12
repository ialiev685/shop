import { Card, Flex, Grid, Group, Image, Paper, Text } from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import type { BasketCardProps } from "./types";
import { LoadingOverlay } from "@mantine/core";

export const BasketCard = ({
  basketProduct,
  onDelete,
  control,
  isLoading,
}: BasketCardProps) => {
  return (
    <Card shadow="sm">
      <LoadingOverlay visible={isLoading} />
      <Card.Section>
        <Group gap={8}>
          <Paper shadow="sm" radius={4}>
            <Image fit="cover" src={basketProduct.product.img} h={80} w={100} />
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
                  {basketProduct.product.name}
                </Text>
              </Grid.Col>
              <Grid.Col span="content">
                <IconTrash
                  size={20}
                  cursor="pointer"
                  onClick={() =>
                    onDelete({
                      basketId: basketProduct.basketId,
                      productId: basketProduct.productId,
                    })
                  }
                />
              </Grid.Col>
            </Grid>

            <Group align="flex-start" gap={8}>
              <Text c="gray-shop-1" fz={12} fw={700}>
                {basketProduct.product.price.toFixed(2)} ₽
              </Text>
              <Text fz={8} c="gray-shop-2">
                за штуку
              </Text>
            </Group>
          </Flex>
        </Group>
      </Card.Section>
      {
        <Group mt={12} justify="space-between" align="center">
          {control}
          <Text c="gray-shop-1" fw={700}>
            {(basketProduct.product.price * basketProduct.quantity).toFixed(2)}{" "}
            ₽
          </Text>
        </Group>
      }
    </Card>
  );
};
