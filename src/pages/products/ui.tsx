import { Box, Flex, Title, TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export const Products = () => {
  const theme = useMantineTheme();
  return (
    <>
      <Flex p="26px 30px" bg="#FFF" justify="space-between" align="center">
        <Title fw="bold" order={3} w={100} c="gray-main-1">
          Товары
        </Title>
        <TextInput
          w={1000}
          placeholder="Найти"
          leftSection={<IconSearch />}
          radius={8}
          styles={{
            input: {
              border: "none",
              backgroundColor: theme.colors["gray-main-5"][0],
              height: 48,
              paddingLeft: 48,
            },
            section: {
              marginLeft: 12,
            },
          }}
        />
        <Box w={100} />
      </Flex>
      <Box p="44px 30px" mt={30} bg="#FFF">
        <Title fw="bold" order={4} c="gray-main-1">
          Все позиции
        </Title>
      </Box>
    </>
  );
};
