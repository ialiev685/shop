import { Sections } from "@/entities/sections";
import { Flex, Title } from "@mantine/core";

export const Catalog = () => {
  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Каталог
      </Title>
      <Sections showCard />
    </Flex>
  );
};
