import { Card, Image, Text, Rating, Flex, Button } from "@mantine/core";

type ProductCardProps = {
  name: string;
  price: number;
  rating: number;
  img: string;
  onPreview: () => void;
  onAddToBasket: () => void;
};

export const ProductCard = ({
  name,
  img,
  rating,
  price,
  onPreview,
  onAddToBasket,
}: ProductCardProps) => {
  return (
    <Card shadow="sm" onClick={onPreview}>
      <Card.Section>
        <Image h={160} src={img} fit="cover" />
      </Card.Section>
      <Flex direction="column" justify="space-between" h="100%" gap={8}>
        <Text c="gray-shop-1" fw={700} fz={18}>
          {price.toFixed(2)}
        </Text>
        <Text c="gray-shop-1">{name}</Text>
        <Rating value={rating} c="accent-shop-1" readOnly />
        <Button
          variant="outline-green-shop"
          onClick={(event) => {
            event.stopPropagation();
            onAddToBasket();
          }}
        >
          В корзину
        </Button>
      </Flex>
    </Card>
  );
};
