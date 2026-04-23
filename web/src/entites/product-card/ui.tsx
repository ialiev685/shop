import { Card, Image, Text, Rating, Flex, Button } from "@mantine/core";

type ProductCardProps = {
  name: string;
  price: number;
  rating: number;
  img: string;
};

export const ProductCard = ({ name, img, rating, price }: ProductCardProps) => {
  return (
    <Card shadow="sm">
      <Card.Section>
        <Image h={160} src={img} fit="contain" />
      </Card.Section>
      <Flex direction="column" justify="space-between" h="100%" gap={8}>
        <Text c="gray-shop-1" fw={700} fz={18}>
          {price.toFixed(2)}
        </Text>
        <Text c="gray-shop-1">{name}</Text>
        <Rating value={rating} c="accent-shop-1" readOnly />
        <Button variant="outline-shop">В корзину</Button>
      </Flex>
    </Card>
  );
};
