import { Box, Flex, Title } from "@mantine/core";
import { SearchInput } from "./search-input";
import { Tabs } from "./tabs";

export const AdminDashboard = () => {
  // const { data, isLoading, onAdd } = useController();

  return (
    <>
      <Flex p="26px 30px" bg="#FFF" justify="space-between" align="center">
        <Title fw="bold" order={3} w={100} c="gray-main-1">
          Товары
        </Title>
        <SearchInput />
        <Box w={100} />
      </Flex>

      <Box p="44px 30px" mt={30} bg="#FFF">
        <Title fw="bold" order={4} c="gray-main-1">
          Все позиции
        </Title>

        <Box mt={24}>
          <Tabs />
        </Box>
      </Box>
    </>
  );
};
