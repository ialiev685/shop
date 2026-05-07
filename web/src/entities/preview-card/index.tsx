import { Card, Image, Button, Text, Rating, Flex, Grid } from "@mantine/core";
import { IconBasket } from "@tabler/icons-react";

interface PreviewCardProps {
  name: string;
  price: number;
  rating: number;
  img: string;
  onAddToBasket: () => void;
}

const PreviewCard = ({
  name,
  price,
  rating,
  img,
  onAddToBasket,
}: PreviewCardProps) => {
  return (
    <Card bg="transparent">
      <Flex direction="column" gap={12}>
        <Card.Section>
          <Rating value={rating} c="accent-shop-1" readOnly />
        </Card.Section>
        <Card.Section>
          <Image src={img} alt={name} w="100%" h={248} fit="cover" />
        </Card.Section>
        <Card.Section>
          <Text fz={24} fw={700} ta="right">
            {price.toFixed(2)} руб.
          </Text>
        </Card.Section>
        <Card.Section>
          <Grid gutter={0}>
            <Grid.Col span={3} pr={8}>
              <Text c="gray-shop-1" fz={12}>
                Описание
              </Text>
            </Grid.Col>
            <Grid.Col span={9}>
              <Text c="gray-shop-1" fz={12}>
                «Спелое яблоко. Хрустит. Сочное. Насыщенный яблочный вкус с
                кисло-сладкими нотами».
              </Text>
            </Grid.Col>
          </Grid>
        </Card.Section>

        <Card.Section>
          <Button
            leftSection={<IconBasket cursor="pointer" />}
            onClick={onAddToBasket}
            w="100%"
            variant="filled-accent-shop"
          >
            В корзину
          </Button>
        </Card.Section>
      </Flex>
    </Card>
  );
};

export default PreviewCard;
