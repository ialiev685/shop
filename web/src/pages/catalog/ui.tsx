import { typeQueries } from "@/entities/catalog";
import { Sections } from "@/entities/sections";
import { Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export const Catalog = () => {
  const { data = [], isLoading } = useQuery(typeQueries.get({}));

  return (
    <Flex direction="column" gap={24}>
      <Title order={2} c="gray-shop-1">
        Каталог
      </Title>
      <Sections showCard data={data} isLoading={isLoading} />
    </Flex>
  );
};
