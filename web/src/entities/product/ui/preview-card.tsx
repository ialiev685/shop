import type { V1ProductInfoListByIdDetailData } from "@/services/data-contracts";
import { Card, Image, Text, Rating, Flex, Grid } from "@mantine/core";
import type { ReactNode } from "react";

interface PreviewCardProps {
  name: string;
  price: number;
  rating: number;
  img: string;
  control?: ReactNode;
  productInfo?: V1ProductInfoListByIdDetailData;
}

export const PreviewCard = ({
  name,
  price,
  rating,
  img,
  control,
  productInfo,
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
        {productInfo && (
          <Card.Section>
            <Grid gutter={0}>
              {productInfo.map(({ name, description }) => (
                <>
                  <Grid.Col span={3} pr={8}>
                    <Text c="gray-shop-1" fz={12}>
                      {name}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Text c="gray-shop-1" fz={12}>
                      {description}
                    </Text>
                  </Grid.Col>
                </>
              ))}
            </Grid>
          </Card.Section>
        )}

        <Card.Section>{control}</Card.Section>
      </Flex>
    </Card>
  );
};
