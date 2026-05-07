import type {
  V1BasketListListData,
  V1ProductListByTypeDetailData,
} from "@/services/data-contracts";
import { Card, Image, Text, Rating, Flex, Button } from "@mantine/core";
import type { UpdateQuantityOptions } from "./types";
import { Counter } from "@/shared/ui/counter";

type ProductCardProps = {
  product: V1ProductListByTypeDetailData["data"][number];
  productInBasket?: V1BasketListListData["basketProducts"][number];
  onPreview: (id: number, name: string) => void;
  onAddToBasket: (id: number) => void;
  onUpdateQuantity: (options: UpdateQuantityOptions) => void;
};

export const ProductCard = ({
  product,
  onPreview,
  onAddToBasket,
  onUpdateQuantity,
  productInBasket,
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
        {!productInBasket ? (
          <Button
            variant="outline-green-shop"
            onClick={(event) => {
              event.stopPropagation();
              onAddToBasket(product.id);
            }}
          >
            В корзину
          </Button>
        ) : (
          <Counter
            quantity={productInBasket.quantity}
            onUpdateQuantity={(quantity) => {
              console.log("quantity", quantity);
              onUpdateQuantity({
                quantity,
                basketId: productInBasket.basketId,
                productId: product.id,
              });
            }}
          />
        )}
      </Flex>
    </Card>
  );
};
