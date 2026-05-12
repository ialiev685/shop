import { Box, Flex, Title } from "@mantine/core";
import { SearchInput } from "./search-input";
import { Tabs } from "./tabs";

export const AdminDashboard = () => {
  return (
    <Flex h="100%" direction="column" gap={24}>
      <Flex p="26px 30px" bg="#FFF" justify="space-between" align="center">
        <Title fw="bold" order={3} w={100} c="gray-main-1">
          Товары
        </Title>
        <SearchInput />
        <Box w={100} />
      </Flex>

      <Flex p="44px 30px" bg="#FFF" flex={1} gap={24} direction="column">
        <Title fw="bold" order={4} c="gray-main-1">
          Все позиции
        </Title>

        <Box flex={1}>
          <Tabs />
        </Box>
      </Flex>
    </Flex>
  );
};
