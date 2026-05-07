import { Card, Flex, Grid, Group, Image, Paper, Text } from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import type { V1BasketListListData } from "@/services/data-contracts";
import { Counter } from "@/shared/ui/counter";
import type { DeleteOptions, UpdateQuantityOptions } from "./types";

type BasketCardProps = {
  basketProduct: V1BasketListListData["basketProducts"][number];
  onUpdateQuantity: (options: UpdateQuantityOptions) => void;
  onDelete: (options: DeleteOptions) => void;
};

export const BasketCard = ({
  basketProduct,
  onDelete,
  onUpdateQuantity,
}: BasketCardProps) => {
  return (
    <Card shadow="sm">
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
                      name: basketProduct.product.name,
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

      <Group mt={12} justify="space-between" align="center">
        <Counter
          quantity={basketProduct.quantity}
          onUpdateQuantity={(quantity) =>
            onUpdateQuantity({
              quantity,
              basketId: basketProduct.basketId,
              productId: basketProduct.productId,
            })
          }
        />
        <Text c="gray-shop-1" fw={700}>
          {(basketProduct.product.price * basketProduct.quantity).toFixed(2)} ₽
        </Text>
      </Group>
    </Card>
  );
};
