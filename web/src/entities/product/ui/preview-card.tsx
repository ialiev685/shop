import type { V1ProductInfoListByIdDetailData } from "@/services/data-contracts";
import {
  Card,
  Image,
  Text,
  Rating,
  Flex,
  Grid,
  Accordion,
} from "@mantine/core";
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
      <Grid>
        <Grid.Col span={{ xs: 12 }}>
          <Rating value={rating} c="accent-shop-1" readOnly />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, md: 6 }}>
          <Flex direction="column" gap={12}>
            <Image src={img} alt={name} w="100%" h={248} fit="cover" />
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ xs: 12, md: 6 }}>
          <Flex direction="column" gap={12}>
            <Text fz={24} fw={700} ta="right">
              {price.toFixed(2)} ₽
            </Text>
            {control}
          </Flex>

          <Accordion>
            <Accordion.Item key={1} value="1">
              <Accordion.Control>Характеристики</Accordion.Control>
              <Accordion.Panel>
                {productInfo && (
                  <Grid gutter={8} grow>
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
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
